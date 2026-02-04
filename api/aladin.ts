import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

  try {
    const {
  mode = 'list',
  QueryType = 'Bestseller',
  ...rest
} = req.query;



    if (mode === 'list' && !QueryType) {
      return res.status(400).json({
        message: 'QueryType is required for list mode',
      });
    }

    const baseUrl =
      mode === 'search'
        ? 'https://www.aladin.co.kr/ttb/api/ItemSearch.aspx'
        : 'https://www.aladin.co.kr/ttb/api/ItemList.aspx';

    const params = new URLSearchParams({
      ttbkey: process.env.ALADIN_TTB_KEY as string,
      SearchTarget: 'Book',
      output: 'js',
      Version: '20131101',
    });
    if (mode === 'list') {
      params.append('QueryType', String(QueryType));
    }

    Object.entries(rest).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });

    const response = await fetch(`${baseUrl}?${params.toString()}`);
    const text = await response.text();

    const jsonText = text
      .replace(/^var\s+.*?=\s*/, '')
      .replace(/;$/, '');

    const data = JSON.parse(jsonText);
    console.log('ALADIN KEY:', process.env.ALADIN_TTB_KEY);
console.log('FETCH URL:', `${baseUrl}?${params.toString()}`);
console.log('RAW RESPONSE:', text.slice(0, 200));


    res.status(200).json(data);
  } catch (error) {
    console.error('ALADIN API ERROR:', error);

    res.status(500).json({
      message: 'Aladin API Proxy Error',
      env: process.env.ALADIN_TTB_KEY,
      error: String(error),
    });
    
  }
}

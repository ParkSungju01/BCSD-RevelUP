import type { VercelRequest, VercelResponse } from '@vercel/node';
console.log('ALADIN_TTB_KEY:', process.env.ALADIN_TTB_KEY)
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('🔥 handler called');

  try {
    const { mode = 'list', ...rest } = req.query;

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

    Object.entries(rest).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });

    const response = await fetch(`${baseUrl}?${params.toString()}`);
    const text = await response.text();

    const jsonText = text
      .replace(/^var\s+.*?=\s*/, '')
      .replace(/;$/, '');

    const data = JSON.parse(jsonText);

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

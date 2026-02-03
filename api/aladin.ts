import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { mode = 'list', ...rest } = req.query;

    const baseUrl =
      mode === 'search'
        ? 'https://www.aladin.co.kr/ttb/api/ItemSearch.aspx'
        : 'https://www.aladin.co.kr/ttb/api/ItemList.aspx';

    const params = new URLSearchParams({
      ttbkey: process.env.ALADIN_TTB_KEY as string,
      SearchTarget: 'Book',
      output: 'json',
      Version: '20131101',
    });

    Object.entries(rest).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });

    const response = await fetch(`${baseUrl}?${params.toString()}`);
    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: 'Aladin API Proxy Error' });
  }
}

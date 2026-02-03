import type {
  FetchBooksParam,
  AladinItemResponse,
} from '../types/typesApi';

export default async function fetchApi({
  mode,
  listQueryType = 'ItemNewAll',
  keyword,
  searchQueryType = 'Title',
  maxResult = 10,
  start = 1,
}: FetchBooksParam): Promise<AladinItemResponse> {
  const params = new URLSearchParams({
    MaxResults: String(maxResult),
    start: String(start),
  });

  if (mode === 'search' && keyword) {
    params.append('mode', 'search');
    params.append('Query', keyword);
    params.append('QueryType', searchQueryType);
  }

  if (mode === 'list') {
    params.append('mode', 'list');
    params.append('QueryType', listQueryType);
  }

  const response = await fetch(`/api/aladin?${params.toString()}`);

  if (!response.ok) {
    throw new Error('API 요청 실패');
  }

  return response.json();
}

import type {FetchBooksParam, AladinItemResponse} from "../types/typesApi"

export const TTB_KEY = import.meta.env.VITE_API_TOKEN

export default async function fetchApi(
  {
  mode,
  listQueryType = 'ItemNewAll',
  keyword,
  searchQueryType = 'Title',
  maxResult = 10,
  start = 1,
}: FetchBooksParam):Promise<AladinItemResponse>{
  const BASE_URL = 
  mode === 'search'?'/aladin/ttb/api/ItemSearch.aspx':'/aladin/ttb/api/ItemList.aspx';

  const params = new URLSearchParams({
    ttbkey: TTB_KEY,
    MaxResults: String(maxResult),
    start: String(start),
    SearchTarget: 'Book',
    output: 'js',
    Version: '20131101',
  });

  if(mode === 'search' && keyword){
    params.append('Query', keyword);
    params.append('QueryType', searchQueryType);
  }

  if(mode === 'list'){
    params.append('QueryType', listQueryType);
  }
  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if(!response.ok) console.log("API 오류");

  return response.json();
}


export interface AladinBook{
  adult?: boolean;
  title: string;
  cover: string;
  author: string;
  customerReviewRank?: number;
  description: string;
  itemId: number;
  link: string;
}
export type ItemListQueryType = 
  | 'ItemNewAll'
  | 'Bestseller';

export type ItemSearchQueryType = 
  | 'Title'
  | "Author";

export type mode = 
  | "list"
  | "search"

export interface FetchBooksParam{
  mode: mode; //mode로 API 구분

  listQueryType?: string;

  keyword?: string;
  searchQueryType?: ItemSearchQueryType;

  maxResult?: number;
  start?: number;
}

export type FetchQuery =
|{
  mode:"list";
  name: ItemListQueryType;
  page: number;
  keyword ?: never;
  searchQueryType ?: never;
}
|{
  mode:"search";
  name?:never;
  page:number;
  keyword:string;
  searchQueryType:ItemSearchQueryType;
}

export interface AladinItemResponse{
  item: AladinBook[];
  totalResults: number;
  startIndex?: number;
}
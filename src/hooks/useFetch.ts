import { useSuspenseQuery } from "@tanstack/react-query";
import fetchApi from "../api/fetchApi.ts";
import type { AladinBook, FetchQuery} from "../types/typesApi.ts";
import useDecode from "./useDecode.ts";


export default function useFetch({
  mode,
  page,
  keyword,
  searchQueryType,
  name,
}:FetchQuery){
  const newBooks = useSuspenseQuery({
    queryKey: [
      mode,
      page,
      name,
      keyword,
      searchQueryType,
    ],
    
    queryFn: ()=>{
      return fetchApi({
        mode,
        keyword,
        searchQueryType,
        listQueryType:name,
        start:page,
        maxResult:15,
      })
    },
    
  })

  const items = newBooks.data?.item??[];
  const books: AladinBook[]= 
  items.map(book => ({
    id: book.itemId,
    title: book.title,
    cover: book.cover,
    itemId: book.itemId,
    link: book.link,
    author: book.author,
    description: useDecode(book.description),
    customerReviewRank : book.customerReviewRank,
    isbn13: book.isbn13,
  }))

  return {
    books,
    totalResults: 100,
  };
}
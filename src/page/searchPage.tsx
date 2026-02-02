import Banner from "../components/Header/Banner"
import Input from "../components/Body/search/Input"
import RecombookList from "../components/Body/search/RecomBookList"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import type { ItemSearchQueryType } from "../types/typesApi"
import { useSearchParams } from "react-router-dom"
import type { FetchQuery } from "../types/typesApi"

export default function SearchPage(){
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query")??"";
  const searchType = (searchParams.get("type") as ItemSearchQueryType) ?? "Title";
  const page = Number(searchParams.get("page")??1);
  const fetchQuery: FetchQuery = query
  ? {
      mode: "search",
      page,
      keyword: query,
      searchQueryType: searchType,
    }
  : {
      mode: "list",
      page,
      name: "Bestseller",
    };

const { books, totalResults } = useFetch(fetchQuery);

useEffect(() => {
  if (query && !searchParams.get("type")) {
    setSearchParams(prev => {
      prev.set("type", "Title");
      return prev;
    });
  }
}, [query]);

  return(
    <div className="pt-15">
    <Banner/>
    <div className="w-full h-full bg-slate-50 flex items-center flex-col
    max-[426px]:text-[14px]">
      <Input
      searchType={searchType}
      onChangeSearchType={(type)=>{
        setSearchParams(prev=>{
          prev.set("type", type);
          prev.set("page","1");
          return prev;
        })
      }}/>
      <div className="w-full h-full flex justify-center items-center">
        <RecombookList books={books} totalResults={totalResults} />
      </div>
    </div>
    
    
    </div>
    
  )
}
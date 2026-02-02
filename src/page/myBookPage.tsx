import Banner from "../components/Header/Banner"
import Pagination from "../components/Body/search/Pagination"
import MyBookList from "../components/Body/myPage/MyBookList";
import MyBookModal from "../components/Body/myPage/MyBookModal";
import Button from "../components/Body/myPage/button"
import type { AladinBook } from "../types/typesApi";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
type BookState = "reading" | "completed" | "heart";

const getBooks = (state:BookState):AladinBook[] =>{
  return Object.keys(localStorage)
    .map((key)=>{
      try{
        const raw = localStorage.getItem(key);
        if(!raw) return null;

        const parsed = JSON.parse(raw);

        if(parsed[state] === true && parsed.data){
          return parsed.data as AladinBook;
        }

        return null;
      } catch{
        return null;
      }
    })
    .filter((book):book is AladinBook => book !== null)
}
export default function MyBookPage(){
  const [selected, setSelected] = useState<AladinBook|null>(null)
  const [searchParams] = useSearchParams();
  
  const page = Number(searchParams.get("page")??1);
  const PAGE_SIZE = 12;
  const readingBooks = getBooks("reading");
  const completedBooks = getBooks("completed");
  const heartBooks = getBooks("heart");
  const booksBySort: Record<BookState, AladinBook[]> = {
    reading: readingBooks,
    completed: completedBooks,
    heart: heartBooks,
  };
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentSort = searchParams.get("sort") as BookState | null;

  const data =
  currentSort && booksBySort[currentSort]
    ? booksBySort[currentSort]
    : readingBooks;
  const pagedBooks = data.slice(start, end);
  return(
    <div className="pt-15">
      {selected && <MyBookModal book={selected} onClose={()=>{setSelected(null)}}/>}
      <Banner/>
      <div className="min-h-screen bg-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold text-emerald-700 mb-6">
            내 책장
          </h1>
          <Button/>
          <MyBookList books={pagedBooks} onSelect={setSelected}/>
          <Pagination totalCount={data.length} PAGE_SIZE={12}/>
        </div>
      </div>
    </div>
    
  )
}
import RecomBook from "./RecomBook"
import type { RecomBookListProps } from "../../../types/TypesUi";
import Pagination from "./Pagination";


export default function RecombookList({
  books,
  totalResults
}:RecomBookListProps){
  const PAGE_SIZE = 10;

  return(
    <>
    <div className="w-full h-full flex justify-center flex-col items-center">
      {books.length===0
      ? <div className="w-full h-298.5 text-center text-gray-500">검색결과 없음</div>
      : books.map(book => (
        <RecomBook key={book.itemId} book={book} />
      ))}

      {books.length>0 && <Pagination
      totalCount={totalResults} PAGE_SIZE={PAGE_SIZE}/>}


    </div>

    </>
    
    
  )
}
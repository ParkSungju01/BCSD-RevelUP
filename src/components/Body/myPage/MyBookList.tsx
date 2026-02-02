import MyBook from "./MyBook";
import type { BookListProps } from "../../../types/TypesUi";

export default function MyBookList({books, onSelect}:BookListProps){
  if(books.length===0){
    return(
      <p className="text-center text-gray-400 py-5">책장에 책이 없습니다.</p>
    )
  }
  return(
    <div className="grid grid-cols-4 gap-6
    max-[770px]:grid-cols-3 max-[770px]:gap-4
    max-[426px]:grid-cols-2 max-[426px]:gap-3 max-[426px]:px-3">
      {books.map(book => (
        <MyBook key={book.itemId} data={book} onClick={()=>onSelect(book)} />
      ))}
    </div>
  )
}
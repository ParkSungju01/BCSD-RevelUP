import type { BookProps } from "../../../types/TypesUi";

export default function Book( {book, onClick}:BookProps){
  return (
    <div className="w-40 h-56 cursor-pointer
    " onClick={onClick}>
      <div className="w-full h-full flex items-end justify-end flex-col mt-2.5">
        <img
        src={book.cover}
        alt={book.title}
        className="h-auto w-40 max-h-60 rounded-lg transition-transform hover:scale-105"
        />
      </div>
      <p className="mt-5 w-40 text-sm text-center text-gray-800 truncate font-semibold">
        {book.title}
      </p>

    </div>
    
    
  );
}
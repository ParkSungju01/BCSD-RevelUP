import type { AladinBook } from "../../../types/typesApi";
import BookList from "./BookList";
import { Suspense } from "react";
import MainSkeleton from "../skeleton/MainSkeleton.tsx";
interface Props{
  onSelect:(book: AladinBook)=>void;
}

export default function NewBook({onSelect}:Props){
  // const {books} = useFetch({
  //   mode:"list",
  //   name:"ItemNewAll",
  //   page:1});
  return(
  <div className="w-6xl h-auto mt-2.5 flex flex-col items-center justify-center
  max-[1025px]:w-250
  max-[770px]:w-180
  max-[426px]:w-100">
  <h1 className="text-2xl font-sans font-bold self-start mt-2.5 mb-3
  max-[770px]:text-xl
  max-[426px]:text-lg">신간 도서</h1>
  <Suspense fallback={<MainSkeleton/>}>
    <BookList name="ItemNewAll" onSelect={onSelect}/>
  </Suspense>
  

  </div>
  )

}
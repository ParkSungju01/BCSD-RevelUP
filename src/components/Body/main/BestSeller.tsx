import BookList from "./BookList";
import type { AladinBook } from "../../../types/typesApi.ts";
import { Suspense } from "react";
import MainSkeleton from "../skeleton/MainSkeleton.tsx";
interface Props{
  onSelect:(book: AladinBook)=>void;
}

export default function BestSeller({onSelect}:Props){
  return(
  <div className="w-6xl h-auto mt-3 flex flex-col items-center justify-center
  max-[1025px]:w-250
  max-[770px]:w-180
  max-[426px]:w-100">
    <h1 className="text-2xl font-sans font-bold self-start mt-5 mb-3
    max-[770px]:text-xl">베스트셀러</h1>
    <Suspense fallback={<MainSkeleton/>}>
      <BookList name="Bestseller" onSelect={onSelect}/>
    </Suspense>
  </div>
  )
}
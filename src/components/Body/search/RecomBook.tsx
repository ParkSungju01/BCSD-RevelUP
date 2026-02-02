import heart from "../../../assets/Heart_01.png"
import gray from "../../../assets/Heart_01.svg"
import star from "../../../assets/star.svg"
import { useEffect, useState } from "react"
import type { AladinBook } from "../../../types/typesApi"
interface Props {
  book:AladinBook;
}
export default function RecomBook({book}:Props){
  const [isHeart, setIsHeart] = useState(false);
  const [clickBtn, setClickBtn] = useState(false);
  const key = String(book.itemId);
  const getData = ()=>{
    const prev = localStorage.getItem(key);
    return prev?JSON.parse(prev) : {};
  }
  

  useEffect(()=>{
    const data = localStorage.getItem(key);
    if(data){
      const parse = JSON.parse(data);
      setIsHeart(!!parse.heart);
      setClickBtn(!!parse.reading);
    }
  },[book.itemId])
  return(
    <div className="w-200 h-auto flex border-b border-b-gray-300 pb-2.5 mb-2.5  
    max-[770px]:w-180
    max-[426px]:w-100">
      <div className="h-30 flex justify-center items-center
      max-[426px]:w-30">
        <img src={book.cover} className="w-20 h-30 ml-5"/>
      </div>
      
      <div className="mr-10 flex flex-col 
      max-[770px]:w-125 max-[770px]:mr-0 max-[426px]:pl-10
      max-[426px]:w-70">
        <p className="ml-10 font-semibold w-100
        max-[426px]:text-[14px] max-[426px]:w-55 max-[426px]:ml-0" >{book.title}
        </p>
        <p className="w-120 h-auto ml-10 line-clamp-2 font-sans mt-2.5
        max-[426px]:text-[12px] max-[426px]:w-55 max-[426px]:ml-0 max-[426px]:h-13">
          {book.description || "줄거리 정보가 없습니다"}
        </p>
        <div className="ml-10 flex mt-auto items-center mb-1
        max-[426px]:ml-0 max-[426px]:mt-2.5">
          <p className="font-semibold mr-1">평점</p>
          <div className="h-6 flex items-center">
            <img src={star}/>
          </div>

          <p className="ml-1 h-6 max-[426px]:h-5">
            {book.customerReviewRank}
          </p>
        </div>
      </div>

      <div className="flex flex-col ml-15 items-end max-[426px]:ml-0 max-[426px]:w-15">
        <button className="h-10 w-20 flex justify-end items-start" onClick={()=>{
          const next=!isHeart;
          setIsHeart(next);
          const latest = getData();
          const newData = {
            ...latest,
            data: book,
            heart: next,
          }
          localStorage.setItem(key,JSON.stringify(newData));
        }}>
          <img src={isHeart?heart:gray} className="w-6 h-6"/>
        </button>
        <button className="h-10 w-20 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 mb-2.5 cursor-pointer
        max-[426px]:w-12 max-[426px]:text-[10px] max-[426px]:h-8"
        onClick={()=>window.open(book.link, "_blank")}>구매하기</button>
        <button className="border border-gray-400 h-10 w-20 rounded-xl bg-white  cursor-pointer hover:bg-gray-300
        max-[426px]:w-12 max-[426px]:text-[10px] max-[426px]:h-8"
        onClick={()=>{
          const next = !clickBtn;
          setClickBtn(next);
          const latest = getData();
          const newData = {
            ...latest,
            data: book,
            reading: next
          }
          localStorage.setItem(key,JSON.stringify(newData));
        }}>
          {clickBtn?"읽는중":"읽기"}
        </button>
        
      </div>
    </div>
  )
}
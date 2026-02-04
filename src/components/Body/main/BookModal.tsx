import type { AladinBook } from "../../../types/typesApi";
import { useState, useEffect } from "react";
import heart from "../../../assets/Heart_01.png"
import noHeart from "../../../assets/Heart_01.svg"
import { useNavigate } from "react-router-dom";
interface Props {
  book: AladinBook;
  onClose: () => void;
}

export default function BookModal({book, onClose}:Props){
  const navigate = useNavigate();
  const key = String(book.isbn13);
  const getData = ()=>{
    const prev = localStorage.getItem(key);
    return prev?JSON.parse(prev) : {};
  }

  const [isHeart, setIsHeart] = useState(false);
  const [clickBtn, setClickBtn] = useState(false);

  useEffect(()=>{
      const data = localStorage.getItem(key);
      if(data){
        const parse = JSON.parse(data);
        setIsHeart(!!parse.heart);
        setClickBtn(!!parse.reading);
      }
      navigate(`/?query${book.itemId}`)
    },[book.itemId])
  return(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={()=>{
      onClose();
      navigate('/')
    }}>
      <div className="
      bg-slate-50 w-200 h-100 rounded-2xl p-6 relative flex
      max-[770px]:w-180
      max-[426px]:w-80 max-[426px]:h-100"
      onClick={(e)=>e.stopPropagation()}>
        <button
          onClick={()=>{
            onClose();
            navigate("/");
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <div className="flex gap-6 w-full
        max-[426px]:gap-0">
          <div className="flex items-center justify-center w-1/2 h-full
          max-[426px]:w-0">
            <img
            src={book.cover}
            alt={book.title}
            className="w-40 rounded-lg shadow
            max-[426px]:hidden"
            />
          </div>
          

          <div className="w-3/4 h-full pr-8 flex flex-col
          max-[426px]:w-65 max-[426px]:pr-0">
            <h2 className="text-xl font-bold mb-2
            max-[426px]:text-lg">
              {book.title}
              
            </h2>

            <p className="text-sm text-gray-500 mb-4
            max-[426px]:text-xs">
              {book.author}
            </p>

            <p className="text-sm h-auto leading-relaxed text-gray-700
            max-[426px]:text-xs">
              {book.description || "줄거리 정보가 없습니다. "}
            </p>

            <div className="mt-auto h-auto flex justify-end items-center gap-4 relative">
              <div className="w-6 h-6 max-[426px]:translate-y-0.5" onClick={()=>{
                const next=!isHeart;
                const latest = getData();
                const nextData = {
                  ...latest,
                  data: book,
                  heart: next,
                }
                localStorage.setItem(key,JSON.stringify(nextData));
                setIsHeart(next);
              }}>
                <img src={isHeart? heart : noHeart}/>
              </div>
              <button
                className="px-6 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700
                max-[426px]:w-20 max-[426px]:h-8 max-[426px]:p-1 max-[426px]:text-[10px]"
                onClick={()=>window.open(book.link, "_blank")}
              >
                구매하기
              </button>
              <button
                className={`px-6 py-2 rounded-full text-black font-medium hover:bg-gray-300
                ${clickBtn?"bg-green-200 border-gray-100":"bg-white border-gray-400"} cursor-pointer
                max-[426px]:w-20 max-[426px]:h-8 max-[426px]:p-1 max-[426px]:text-[10px]`}
                onClick={()=>{
                  const next = !clickBtn;
                  const latest = getData();
                  const nextData = {
                  ...latest,
                  data: book,
                  reading: next,
                  }
                  setClickBtn(next);
                  localStorage.setItem(key,JSON.stringify(nextData));
                  }}
              >
                {clickBtn?"읽는중":"읽기"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
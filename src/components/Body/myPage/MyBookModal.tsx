import type { AladinBook } from "../../../types/typesApi";
import type { BookStatus } from "../../../types/TypesUi";
import { useEffect, useState } from "react";
import heart from "../../../assets/Heart_01.png"
import noHeart from "../../../assets/Heart_01.svg"
interface Props {
  book: AladinBook;
  onClose: () => void;
}
export default function MyBookModal({book, onClose}:Props){
  const key = String(book.isbn13);
  const [status, setStatus] = useState<BookStatus>("none");
  const [report, setReport] = useState("");
  const [isHeart, setIsHeart] = useState(false);
  useEffect(() => {
  const raw = localStorage.getItem(key);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    setIsHeart(!!parsed.heart);
    setReport(parsed.bookReport);
  } catch {
    setIsHeart(false);
    setReport("");
  }
}, [key]);

  useEffect(()=>{
    const raw = localStorage.getItem(key);
    if(!raw) return;

    const parsed = JSON.parse(raw);
    if(parsed.reading) setStatus("reading");
    else if(parsed.completed) setStatus("completed");
    else setStatus("none")
  }, [key]);
  if(!book){
    console.log("book Error");
  }
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-50 w-150 h-200 rounded-2xl p-6 relative flex
      max-[1025px]:w-130 max-[1025px]:h-180
      max-[770px]:h-180 max-[770px]:w-130
      max-[426px]:w-100 max-[426px]:h-160">
        <button
          onClick={()=>{
            onClose();
          }}
          className="absolute top-4 right-5 text-gray-400 hover:text-black"
        >
          ✕
        </button>
        <img src={isHeart?heart:noHeart} className="w-6 h-6 absolute" 
        onClick={()=>{
          const next = !isHeart;
          setIsHeart(next); 

          const raw = localStorage.getItem(key);
          const prev = raw ? JSON.parse(raw) : {};
          const newData = {
            ...prev,
            heart:next,
          }

          localStorage.setItem(
            key,JSON.stringify(newData));
        }}
        />
        <div className="w-full flex flex-col items-center gap-3
        max-[1025px]:gap-2
        max-[770px]:gap-3
        max-[426px]:gap-1
        ">
          <img src={book.cover} className="h-47.5 w-auto"/>
          <div className="w-full">
            <h1 className="self-start text-xl font-bold mb-1
            max-[1025px]:text-[17px]
            max-[770px]:text-[17px]
            max-[426px]:text-[15px]">제목 : {book.title}</h1>
            <p className="self-start font-semibold mb-2 text-gray-500
            max-[1025px]:text-[14px]
            max-[770px]:text-[14px]
            max-[426px]:text-[12px]">{book.author}</p>
          </div>
          
          <div className="w-full">
            <p className="text-[18px] font-bold
            max-[426px]:text-[16px]">상태</p>
            <form>
              <select className="rounded-lg h-8
              max-[426px]:text-[14px] text-center"
              value={status}
              onChange={(e)=>{
                const next = e.target.value as BookStatus;
                setStatus(next);

                const raw = localStorage.getItem(String(book.itemId));
                const prev = raw ? JSON.parse(raw) : {};

                const newData={
                  ...prev,
                  reading:next==="reading",
                  completed:next==="completed",
                };

                localStorage.setItem(key,JSON.stringify(newData));
              }}>
                <option value={"none"} >선택</option>
                <option value={"reading"}>읽는중</option>
                <option value={"completed"}>완료</option>
              </select>
            </form>
          </div>
          <div className="w-full">
            <p className="self-start text-[18px] font-bold mb-1
            max-[426px]:text-[16px]">줄거리</p>
            <p className="max-[1025px]:text-[14px]
            max-[426px]:text-[12px]">{book.description || "줄거리가 없습니다"}</p>
          </div>

          <div className="w-full">
            <p className="self-start text-[18px] font-bold mb-1
            max-[426px]:text-[16px]">독서 기록</p>
            <textarea value={report} className="w-full bg-white h-40 p-2.5 resize-none border border-gray-400 rounded-xl
            max-[1025px]:h-32 max-[770px]:h-28" placeholder="글을 읽고 느낀점을 써보세요..." onChange={(e)=>{
              setReport(e.target.value);
            }}/>
          </div>
  
          <div className="w-full justify-end flex flex-col gap-2">
            <button className="cursor-pointer bg-green-600 text-white rounded-xl h-10" onClick={()=>{
              if(report===""){
                onClose();
              }
              else{
                const raw = localStorage.getItem(String(book.itemId));
                const parsed = raw?JSON.parse(raw):{};
                const newData = {
                  ...parsed,
                  bookReport : report,
                }
                localStorage.setItem(key,JSON.stringify(newData));
                setReport("");
                onClose();
              }
            }}>저장</button>
            <button onClick={()=>{window.open(book.link,"_blank")}} className="cursor-pointer bg-white border border-gray-400 rounded-xl h-10">구매하기</button>
          </div>
        </div>
      </div>
    </div>
  )
}
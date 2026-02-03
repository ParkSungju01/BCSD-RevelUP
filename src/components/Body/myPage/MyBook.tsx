import type { AladinBook } from "../../../types/typesApi";
interface Props{
  data:AladinBook;
  reading?:boolean;
  heart?: boolean;
  completed?:boolean;
  onClick: ()=>void;
}


export default function MyBook({data, onClick}:Props ){
  const state = localStorage.getItem(String(data.isbn13));
  const parsed = state ? JSON.parse(state) : null;

  const isReading = parsed?.reading === true;
  const isCompleted = parsed?.completed === true;

  let statusLabel:string|null=null;
  if(isReading) statusLabel = "읽는 중";
  else if(isCompleted) statusLabel = "완료";
  
  return(
    <div className="cursor-pointer" onClick={onClick}>
    <div className="bg-white rounded-2xl shadow-md p-4 w-62.5 h-77.5
    max-[1025px]:w-55 max-[1025px]:h-67.5
    max-[770px]:w-52.5 max-[770px]:h-72.5
    max-[426px]:w-40 max-[426px]:h-55">
      <div className="h-45 flex justify-center bg-gray-100 rounded-xl mb-3 pt-5
      max-[1025px]:h-37.5
      max-[770px]:h-42.5
      max-[426px]:h-25">
        <img
          src={data.cover}
          alt={data.title}
          className="w-auto h-full object-cover rounded-xl"
        />
      </div>
      
      <h3 className="font-semibold text-sm truncate">
        {data.title}
      </h3>
      <p className="text-xs text-gray-500 mt-1 h-8
      max-[1025px]:h-6.5
      max-[770px]:text-[11px]
      max-[426px]:text-[10px] max-[426px]:h-6">
        {data.author}
      </p>
      {statusLabel && <span className="inline-block mb-2 px-3 py-1 text-xs rounded-full bg-green-100 text-emerald-700 mt-2.5">
        {statusLabel}
      </span>}
    </div>
    </div>
  )
}
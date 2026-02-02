import { useSearchParams } from "react-router-dom"

export default function Button(){
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort");

  const category = (query : string)=>{
    setSearchParams(prev=>{
      prev.set("sort", query);
      return prev;
    })
  }

  const active =
    "bg-green-600 text-white";
  const inactive =
    "bg-white text-gray-600";
  
  return(
    <div className="flex gap-3 mb-8">
    <button className={`px-4 py-2 rounded-full text-sm shadow-sm ${currentSort==="reading"?active:inactive}`} 
    onClick={()=>{
      category("reading");
    }}>읽는 중</button>
    <button className={`px-4 py-2 rounded-full text-sm shadow-sm ${currentSort==="completed"?active:inactive}`}
    onClick={()=>{
      category("completed");
    }}>다 읽은 책</button>
    <button className={`px-4 py-2 rounded-full text-sm shadow-sm ${currentSort=="heart"?active:inactive}`}
    onClick={()=>{
      category("heart");
    }}> 관심있는 책</button>
    </div>
  )
}
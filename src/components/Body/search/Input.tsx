import search from "../../../assets/search_button.png"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

interface InputProps{
  searchType: "Title" | "Author";
  onChangeSearchType: (type: "Title" | "Author")=>void;
}

export default function Input({
  searchType,
  onChangeSearchType,
}:InputProps){
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")??"";
  const [value,setValue] = useState("");
  useEffect(()=>{
    setValue(query);
  },[query]);
  const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter" && !e.nativeEvent.isComposing){
      if(value){
        navigate(`/search?query=${encodeURIComponent(value.trim())}&page=1&type=${searchType}`);
      }else{
        alert("검색어를를 입력해주세요");
      }
    }
  };

  return(
    <div className="w-full h-25 mt-20 flex items-center flex-col">
      <div className="flex  w-200 h-10 shadow-md rounded-3xl mb-2.5 bg-white
      max-[770px]:w-180
      max-[426px]:w-100">
        <input placeholder="읽고 싶은 책을 검색해보세요" className="w-170 ml-10 pl-2.5
        max-[770px]:w-150
        max-[426px]:w-75"
        value={value}
        onChange={(e)=> setValue(e.target.value)}
        onKeyDown={onKeyDown}/>
        <button className="w-6 h-6 relative top-2 left-8 cursor-pointer " onClick={()=>{
          if(!value.trim()) return;
          navigate(`/search?query=${encodeURIComponent(value.trim())}&page=1`);
          }}>
          <img src={search} className="w-6 h-6 max-[770px]:w-5 max-[770px]:h-5
          max-[426px]:w-4 max-[426px]:h-4"/>
        </button>
      </div>

      <div className="w-200 h-4 pl-8 flex items-center
      max-[770px]:w-190
      max-[426px]:w-110
      ">
        <input type="radio" className="w-4 h-4 self-start mr-2.5
        max-[426px]:w-3 max-[426px]:h-3 translate-y-0.5"
        name="searchType"
        checked={searchType==="Title"}
        onChange={() => onChangeSearchType("Title")}/>
        <p className="mr-5
        max-[426px]:text-[15px]">책 제목</p>
        <input type="radio" className="w-4 h-4 self-start mr-2.5
        max-[426px]:w-3 max-[426px]:h-3 max-[426px]:translate-y-0.5"
        name="searchType"
        checked={searchType === "Author"}
        onChange={() => onChangeSearchType("Author")}
        />
        <p className="mr-5 max-[426px]:text-[15px]">작가명</p>
      </div>
      
    </div>
    
  )
}
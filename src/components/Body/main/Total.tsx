import noRank from "../../../assets/noRank.png"
import bronze from "../../../assets/bronze.png"
import sliver from "../../../assets/silver.png"
import gold from "../../../assets/gold.png"
import platinum from "../../../assets/platinum.png"
import diamond from "../../../assets/diamond.png"
import master from "../../../assets/master.png"
import type { AladinBook } from "../../../types/typesApi"
import GaugeBar from "./Gaugebar"
import { RANK_COLOR } from "./Gaugebar"

const getBooks = (state:"completed"):AladinBook[]=>{
  return Object.keys(localStorage)
  .map((key)=>{
    try{
      const raw = localStorage.getItem(key);
      if(!raw) return null;

      const parsed = JSON.parse(raw);

      if(parsed[state] === true && parsed.data){
        return parsed.data as AladinBook;
      }
      return null;
    }catch{
      return null;
    }
  })
  .filter((book):book is AladinBook => book !== null)
}
export default function Total(){
  const current = getBooks("completed").length;
  const rankImage = (count:number)=>{
    if(count>=150) return master;
    if(count>=100) return diamond;
    if(count>=60) return platinum;
    if(count>=30) return gold;
    if(count>=15) return sliver;
    if(count>=5) return bronze;
    if(count>=0) return noRank;
  }
  const rankName = (count:number)=>{
    if(count>=150) return "MASTER";
    if(count>=100) return "DIAMOND";
    if(count>=60) return "PLATINUM";
    if(count>=30) return "GOLD";
    if(count>=15) return "SILVER";
    if(count>=5) return "BRONZE";
    return "IRON";
  }
  const grade = (rank:string)=>{
    switch(rank){
      case "MASTER":
        return 150;
      case "DIAMOND":
        return 150;
      case "PLATINUM":
        return 100;
      case "GOLD":
        return 60;
      case "SILVER":
        return 30;
      case "BRONZE":
        return 15;
      default:
        return 5;
    }
  }
  const total = grade(rankName(current));
  return(
    <div className="rounded-2xl w-300 h-97.5 mt-2.5 shadow-md bg-white p-4 flex
    max-[1025px]:w-250
    max-[770px]:w-180
    max-[426px]:w-100
    max-[426px]:flex-col">
      <div className="w-2/3 h-full
      ">
        <div className="w-full h-1/2 flex flex-col gap-4 justify-center
        max-[426px]:flex-row max-[426px]:w-90 max-[426px]:gap-0 max-[426px]:h-15">
          <h1 className="text-5xl font-extrabold tracking-tight text-emerald-600
          max-[770px]:text-4xl
          max-[426px]:text-2xl
          max-[426px]:w-17">오늘도</h1>
          <h1 className="text-5xl font-extrabold tracking-tight text-emerald-600
          max-[770px]:text-4xl
          max-[426px]:text-2xl">독서 Level Up 해볼까요?</h1>
        </div>
        <p className="text-gray-500 mb-2.5" style={{color:RANK_COLOR[rankName(current)]}}>현재 랭크 : {rankName(current)} </p>
        <div className="mb-5">
          <p style={{color:RANK_COLOR[rankName(current)]}}>지금까지 읽은 책 : {current}</p>
          <GaugeBar current={current} total={total} rank={rankName(current)}/>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          다음 랭크까지 <span className="font-medium" style={{color:RANK_COLOR[rankName(current)]}}>{(total-current)>0?total-current:0}권</span> 남았어요
        </p>
      </div>
      <div className="w-1/3 h-full flex items-center justify-start
      max-[426px]:h-40 max-[426px]:w-full max-[426px]:justify-center">
        <img src={rankImage(current)} className="max-[426px]:w-40"/>
      </div>
    
    </div>
  )
}
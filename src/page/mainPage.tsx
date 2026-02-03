import Banner from "../components/Header/Banner"
import Total from "../components/Body/main/Total"
import NewBook from "../components/Body/main/NewBook"
import BestSeller from "../components/Body/main/BestSeller"
import BookModal from "../components/Body/main/BookModal"
import { useState } from "react"
import type { AladinBook } from "../types/typesApi"
export default function Main(){
  const [selected,setSelected] = useState<AladinBook | null>(null);
  
  return(
    <div className="pt-15">
      {selected && <BookModal book={selected} onClose={()=>setSelected(null)}/>}
      <Banner/>
      <div className="w-full h-full bg-slate-50 flex items-center flex-col">
        <Total/>
        <NewBook onSelect={setSelected}/>
        <BestSeller onSelect={setSelected}/>
      </div>
    
    </div>
  )
}
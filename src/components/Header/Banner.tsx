import Menu from "./Menu"
import { useNavigate } from "react-router-dom"
export default function Banner(){
  const navigate = useNavigate();
  return(
    <div className="w-full h-15 flex justify-between bg-white fixed inset-0 z-10
    max-[1025px]:w-5xl
    max-[770px]:w-192.5
    max-[426px]:w-106.5
    ">
      <div onClick={()=>{
        navigate("/");
      }} className="cursor-pointer">
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-600 h-full w-35 flex justify-center items-center ml-2.5">
        Revel Up
        </h1>
      </div>
      <Menu/>
    </div>
  )
}
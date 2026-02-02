import Menu from "./Menu"
export default function Banner(){
  return(
    <div className="w-full h-15 flex justify-between bg-white fixed inset-0 z-10
    max-[1025px]:w-5xl
    max-[770px]:w-192.5
    max-[426px]:w-106.5
    ">
      <h1 className="text-3xl font-sans font-semibold tracking-tight text-emerald-600 h-full w-35 flex justify-center items-center ml-2.5">
        Revel Up
      </h1>
      <Menu/>
    </div>
  )
}
export default function MainSkeleton(){
  return(
    <>
      <div className="flex w-300 h-80 gap-9 pl-7.5 pr-5 pt-5 inset-shadow-sm rounded-2xl overflow-hidden
      max-[1025px]:w-250
      max-[770px]:w-180
      max-[426px]:w-100">
        {[...Array(6)].map((_,index)=>(
          <div className="flex flex-col w-40 h-100" key={index}>
            <div className="animate-pulse bg-gray-300 rounded-lg
            w-40 h-60
            "/>
            <div className="mt-5 w-40 bg-gray-300 h-5 rounded-lg animate-pulse"/>
          </div>
          
        ))}
      </div>
    </>
  )
}
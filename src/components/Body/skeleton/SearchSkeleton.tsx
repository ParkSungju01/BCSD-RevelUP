import Banner from "../../Header/Banner"
export default function SearchSkeleton(){
  return(
    <>
    <Banner/>
    <div className="w-full h-full pt-10 animate-pulse flex flex-col items-center">
      <div className="mt-25 mb-10 flex flex-col items-center">
        <div className="h-10 w-200 rounded-full bg-gray-200 mb-3
        max-[770px]:w-180
        max-[426px]:w-100" />

        <div className="w-200 h-4 pl-8 flex items-center
        max-[770px]:w-190
        max-[426px]:w-110">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
      
      <div className="w-full h-full flex justify-center flex-col items-center">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-200 h-35 flex border-b border-b-gray-300 pb-2.5 mb-2.5 ml-5
            max-[770px]:w-175 max-[770px]:ml-0 max-[426px]:px-4
            max-[426px]:w-full"
          >

            <div className="w-20 h-30 bg-gray-200 rounded-md  mr-7.5
            " />


            <div className="flex-1 space-y-3
            max-[426px]:w-50">
              <div className="h-5 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded mt-7.5" />
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="h-6 w-6 bg-gray-200 rounded-full" />
              <div className="h-9 w-20 bg-gray-200 rounded-lg
              max-[426px]:w-12 max-[426px]:h-8" />
              <div className="h-9 w-20 bg-gray-200 rounded-lg
              max-[426px]:w-12 max-[426px]:h-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}
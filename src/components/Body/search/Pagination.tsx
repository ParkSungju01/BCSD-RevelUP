import { useSearchParams } from "react-router-dom";
interface PaginationProps {
  totalCount: number;
  PAGE_SIZE : number;
}

export default function Pagination({
  totalCount, PAGE_SIZE
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")??1);
  const totalPages = Math.ceil(totalCount/PAGE_SIZE);


  const startPage = 1;
  const endPage = Math.min(PAGE_SIZE, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const movePage = (p: number) => {
    setSearchParams((prev=>{
      prev.set("page",String(p));
      return prev;
    }),{replace:false})
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex gap-2 h-15 pb-7.5 mt-5 justify-center items-center
    max-[426px]:w-100">
      {pages.map(p => (
        <button
          key={p}
          onClick={() => movePage(p)}
          className={`px-3 py-1 rounded border cursor-pointer
            ${p === page ? "bg-emerald-500 text-white" : ""}
            max-[426px]:text-[10px] max-[426px]:h-8
          `}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

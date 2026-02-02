import { useRef, useEffect } from "react";
import Book from "./Book";
import useFetch from "../../../hooks/useFetch";

interface Props{
  name: "Bestseller" | "ItemNewAll";
  onSelect:(book: any)=>void;
}


export default function BookList({ name, onSelect }: Props) {
    const {books} = useFetch({
      mode:"list",
      name,
      page: 1})
  const ITEM_WIDTH = 196;
  const INTERVAL = 2000; 
  const sliderRef = useRef<HTMLDivElement | null>(null);

  /* 자동스크롤 구현 */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScroll) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        slider.scrollBy({
          left: ITEM_WIDTH,
          behavior: "smooth",
        });
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);


  const handleNext = () => {
    sliderRef.current?.scrollBy({ left: ITEM_WIDTH, behavior: "smooth" });
  };

  const handlePrev = () => {
    sliderRef.current?.scrollBy({ left: -ITEM_WIDTH, behavior: "smooth" });
  };

  return (
    <div className="relative group w-full
    max-[1025px]:w-250
    max-[770px]:w-180
    max-[426px]:w-100 max-[426px]:h-70">
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 
        hidden group-hover:flex
        w-10 h-10 rounded-full bg-gray-300/80
        items-center justify-center z-10"
      >
        ◀
      </button>
      <div ref={sliderRef} className="flex w-300 h-80 gap-9 pl-7.5 pr-5 pt-5 inset-shadow-sm rounded-2xl overflow-hidden
      max-[1025px]:w-250
      max-[770px]:w-180
      max-[426px]:w-100 ">
        {books.map(book => (
          <Book key={book.itemId} book={book} onClick={()=>onSelect(book)}/>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="absolute left-285 top-1/2 -translate-y-1/2
        hidden group-hover:flex
        w-10 h-10 rounded-full bg-gray-300/80
        items-center justify-center z-10
        max-[1025px]:left-238
        max-[770px]:left-168
        max-[426px]:left-91
        "
      >
        ▶
      </button>
    </div>
  );
}

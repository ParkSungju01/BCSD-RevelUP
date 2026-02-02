import type { AladinBook } from "./typesApi";

export interface BookProps {
  book: AladinBook;
  onClick: ()=>void;
}

export interface BookListProps {
  books: AladinBook[];
  onSelect:(book:AladinBook) =>void;
}

export interface RecomBookListProps{
  books:AladinBook[];
  totalResults: number;
}

export type BookStatus = "none" | "reading" | "completed";


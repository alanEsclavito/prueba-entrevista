import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getInventory } from "./api/books.js";
import Book from "./components/Book.jsx";

const SearchPage = ({ setView }) => {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["search-books"],
    queryFn: () => getInventory(),
  });
  if (error) return "Error: " + error;
  if (isLoading) return "Loading: ";
  const {
    data: { data: books },
  } = data;
  console.log(books);

  return (
    <div className="z-10 overflow-scroll p-10 bg-white fixed left-20 right-20 top-20 bottom-20">
      <button
        className="text-base bg-[#000000]"
        onClick={() => setView("main")}
      >
        Cerrar
      </button>
      <div className="flex flex-col gap-3 my-10">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" className="grow" placeholder="Nombre del autor" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className="grow" placeholder="Título del libro" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input value={category} onChange={(e)=>setCategory(e.target.value)} type="text" className="grow" placeholder="Categoría del libro" />
        </label>
      </div>
      <div className="flex flex-wrap justify-center gap-10 my-10">
        {books
          .filter((book) => {
            if (!author) return true;
            book.author_name.startsWith(author);
          })
          .filter((book) => {
            if (!category) return true;
            book.category_name.startsWith(category);
          })
          .filter((book) => {
            if (!title) return true;
            book.title.startsWith(title);
          })
          .map((book) => (
            <Book key={book.id} year={book.year} title={book.title} />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;

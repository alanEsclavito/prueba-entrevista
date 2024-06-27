import { useQuery } from "@tanstack/react-query";
import { getBooks } from "./api/books.js";
import { useState } from "react";
import SearchPage from "./SearchPage.jsx";
import Book from "./components/Book.jsx"
const HomePage = () => {
  const [view, setView] = useState("home");
  const { data, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });
  if (error) return "Error: " + error;
  if (isLoading) return "Loading: ";
  const {
    data: { data: books },
  } = data;
  console.log(books);

  if (view === "buscar") return <SearchPage />;

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={()=> setView("search")}>Buscar libro</a>
              </li>
              <li>
                <a>Inventario</a>
              </li>
              <li>
                <a>Ganancias</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Bienvenido</a>
        </div>
        <div className="navbar-end"></div>
      </div>
      {view === "search" && (
        <SearchPage setView={setView}/>
      )}
      <div className="flex flex-wrap justify-center gap-10 my-10">
        {books.map((book) => (
          <Book key={book.id} year={book.year} title={book.title}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

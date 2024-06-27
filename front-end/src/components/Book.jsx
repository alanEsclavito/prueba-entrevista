
const Book = (book) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://www.psicoactiva.com/wp-content/uploads/puzzleclopedia/libro-abierto.png"
                alt="Book"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <p>{book.year}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Comprar</button>
              </div>
            </div>
          </div>
  )
}

export default Book

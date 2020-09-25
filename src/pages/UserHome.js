import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getAllUsersBooks } from "../services/books"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from "@fortawesome/free-solid-svg-icons"

function UserHome() {
  const [books, setBooks] = useState(null)
  
  async function fetchBooks() {
    const userbooks = await getAllUsersBooks()
    setBooks(userbooks.user.books)
  }

  useEffect(() => {
    fetchBooks()
  }, [])


  return (
    <div className="userhome">
      <div>
        <h3>Estantes</h3>
        <ul>
          <li><FontAwesomeIcon icon={faBook}/>Todos tus libros</li>
        </ul>
      </div>
      <div>
        <div>
          <Link to="/newbook">Nuevo libro</Link>
        </div>
        <div>
          {books?.map((book, i)=> (
            <div className="bookcard">
              <img src={book.cover} alt="Book cover"/>
              <div>
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
              <div>
                <button><Link to={`/detialbook/${book._id}`}>Detalles</Link></button>
              </div>
            </div>
          ))}
          {!books && <p>Aún no tienes libros</p>}
        </div>
      </div>
    </div>
  )
}

export default UserHome

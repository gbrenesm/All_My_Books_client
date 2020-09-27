import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import { getAllUsersBooks } from "../services/books"
import Loader from "../components/Loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import { Context } from "../context"


function UserHome() {
  const [books, setBooks] = useState(null)
  const { user } = useContext(Context)

  
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
          {books? books.map((book, i)=> (
            <div key={i} className="bookcard">
              <img src={book.cover} alt="Book cover"/>
              <div>
                <h4>{book.title}</h4>
          <p>{book.authorFirstName} {book.authorLastName}</p>
              </div>
              <div>
                <button><Link to={`/detialbook/${book._id}`}>Detalles</Link></button>
              </div>
            </div>
          )) : <Loader></Loader>}
          {!books && <p>Aún no tienes libros</p>}
        </div>
      </div>
    </div>
  )
}

export default UserHome

import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Context } from "../context"
import { getAllUsersBooks } from "../services/books"

function UserHome() {
  const { user } = useContext(Context)
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
          <li><i class="fas fa-book"></i>Todos tus libros</li>
        </ul>
      </div>
      <div>
        <div>
          <Link to="/newbook">Nuevo libro</Link>
        </div>
        <div>
          {books?.map((book, i)=> (
            <div className="bookcard">
              <img src={book.cover}/>
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

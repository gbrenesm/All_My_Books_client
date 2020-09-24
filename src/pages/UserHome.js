import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../context"
import { getAllUsersBooks } from "../services/books"

function UserHome() {
  const { user } = useContext(Context)
  const [books, setBooks] = useState(null)
  
  async function fetchBooks() {
    const userbooks = await getAllUsersBooks()
    setBooks(userbooks.user.books)
    console.log(userbooks.user.books)
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
        <p>Usuario: {user?.email}</p>
        {books?.map((book, i)=> (
          <div>
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserHome

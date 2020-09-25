import React, { useState, useEffect } from 'react'
import { getBookDetail, deleteBook } from "../services/books"
import Loader from "../components/Loader"
import { useHistory } from "react-router-dom"

function BookDetail({ match: { params: { bookId } }}) {
  const [book, setBook] = useState(null)
  const history = useHistory()

  async function fetchBook() {
    const detailbook = await getBookDetail(bookId)
    setBook(detailbook.book)
    console.log(detailbook.book)
  }

  async function eliminateBook(){
    await deleteBook(bookId)
    history.push("/userhome")
  }

  useEffect(() => {
    fetchBook()
  }, [])

  return (
    <div className="bookdetail">
      <h1>Detalles de libro</h1>
        {book? <div>
          <img src={book.cover}/>
          <h2>{book.title}</h2>
          <button onClick={eliminateBook}>Eliminar libro</button>
          </div>
        : <Loader></Loader>}
    </div>
  )
}

export default BookDetail

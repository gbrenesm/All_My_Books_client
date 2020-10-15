import React, { useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import useInput from "../hooks/useInput"
import BookForm from "../components/BookForm"
import Loader from "../components/Loader"


function GoogleSearch() {
  const searchInput = useInput("")
  const [books, setBooks] = useState(null)
  const [bookToAdd, setBookToAdd] = useState(null)

  async function submitSearch(e){
    e.preventDefault()
    const data = await axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchInput.value + "&key=" + process.env.REACT_APP_GOOGLEKEY)
    const databook = data.data.items
    databook.forEach(e => 
      console.log(e.volumeInfo))
    setBooks(data.data.items)
  }

  async function addBook(book){
    setBookToAdd(book)
    setBooks(null)
  }

  return (
    <div className="searchgoogle">
      <form onSubmit={submitSearch} className="search">
        <label>Buscar:</label>
        <input type="text" className="searchTerm" placeholder="Busca libros" {...searchInput}/>
        <button type="submit">Buscar</button>
      </form>
      {bookToAdd && <BookForm book={bookToAdd}/>}
      {books? books.map((book, i)=> (
            <div key={i} className="bookcard">
              <img src={book.volumeInfo.imageLinks? book.volumeInfo.imageLinks.thumbnail: ""} alt="Book cover"/>
              <div>
                <h4>{book.volumeInfo.title}</h4>
                <p>{book.volumeInfo.authors && book.volumeInfo.authors[0]}</p>
                <p>{book.coAuthorFirstName} {book.coAuthorLastName}</p>
              </div>
              <div>
                <button><Link onClick={() => addBook(book.volumeInfo)}>Detalles</Link></button>
              </div>
            </div>
          )) 
          : <Loader></Loader>}
    </div>
  )
}

export default GoogleSearch

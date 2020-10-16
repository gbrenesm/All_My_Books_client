import React, { useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import useInput from "../hooks/useInput"
import BookForm from "./BookForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faSearch } from "@fortawesome/free-solid-svg-icons"



function GoogleSearch({setBookFromScratch}) {
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
    setBookFromScratch(false)
  }

  async function addBook(book){
    setBookToAdd(book)
    setBooks(null)
  }

  return (
    <div className="userhome">

        <form onSubmit={submitSearch} className="search">
          <input type="text" className="searchTerm" placeholder="Busca por autor(a) o título" {...searchInput}/>
          <button className="searchButton"><FontAwesomeIcon icon={faSearch}/></button>
        </form>
      {bookToAdd && <BookForm book={bookToAdd}/>}
      <div>
        {books && books.map((book, i)=> (
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
            )) }
      </div>
    </div>
  )
}

export default GoogleSearch

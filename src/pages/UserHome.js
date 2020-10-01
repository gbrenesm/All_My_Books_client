import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getAllUsersBooks, getAllUserBooksAuthor } from "../services/books"
import ShelvesUserHomes from "../components/ShlevesUserHome"
import useInput from "../hooks/useInput"
import Loader from "../components/Loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faSearch, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

function UserHome() {
  const [books, setBooks] = useState(null)
  const [shelves, setShelves] = useState(null)
  const [changePage, setChangePage] = useState(false)
  // const [elemPages, setElemPages] = useState(12)
  // const [cutElem, setCutElem] = useState(0)
  // const [lessBtn, setLessbtn] = useState(false)
  // const [moreBtn, setMoreBtn] = useState(false)
  const [searchOn, setSearchOn] = useState(false)
  const [newShlef, setNewShlef] = useState(false)
  const searchInput = useInput("")
  const [activeBtn, setActiveBtn] = useState(true)

  // function pagesBtn(){
    
  // }

  // function pagintationMore(){
  //   setCutElem(cutElem + 12)
  //   setElemPages(elemPages + 12)
  //   setChangePage(true)
  //   setLessbtn(true)
  // }

  // function pagintationLess(){
  //   setCutElem(cutElem - 12)
  //   setElemPages(elemPages - 12)
  //   setChangePage(true)
  // }

  async function fetchAllBooks() {
    const userbooks = await getAllUsersBooks()
    setBooks(userbooks.user.books)
    setShelves(userbooks.user.shelves)
    // if (userbooks.user.books.length >= 12) setMoreBtn(true)
    setSearchOn(false)
    setActiveBtn(true)
  }

  async function fetchBooksByAuthor(){
    const userbooks = await getAllUserBooksAuthor()
    setBooks(userbooks.user.books)
    setActiveBtn(false)
  }

  function submitSearch(e){
    e.preventDefault()
    setSearchOn(true)
    setBooks(books.filter(book => book.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                                  book.authorFirstName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                                  book.authorLastName.toLowerCase().includes(searchInput.value.toLowerCase())))
    if (searchInput.value === "") fetchAllBooks()
  }

  useEffect(() => {
    fetchAllBooks()
    setChangePage(false)
    setNewShlef(false)
  }, [changePage, newShlef])


  return (
    <div className="userhome">
        <ShelvesUserHomes shelves={shelves} setNewShlef={setNewShlef} fetchAllBooks={fetchAllBooks} setBooks={setBooks}/>
      <div>
        <form onChange={submitSearch} onSubmit={submitSearch} className="search">
        <button onClick={fetchAllBooks} className="returnBtutton"><FontAwesomeIcon icon={faChevronLeft}/></button>
        <input type="text" className="searchTerm" placeholder="Busca por autor(a) o título" {...searchInput}/>
        <button className="searchButton"><FontAwesomeIcon icon={faSearch}/></button>
        </form>
        <div>
        {!searchOn &&
          <>
          <button style={!activeBtn? {backgroundColor: "#588157"} : {backgroundColor: "#e5e5e5", color: "#343a40"}} className="sortButton" onClick={fetchBooksByAuthor}>Ver por autor(a)</button>
          <button style={activeBtn? {backgroundColor: "#588157"} : {backgroundColor: "#e5e5e5", color: "#343a40"}} className="sortButton" onClick={fetchAllBooks}>Ver por título</button>
          </>}
        </div>
        <div>
          {books? books.map((book, i)=> (
            <div key={i} className="bookcard">
              <img src={book.cover} alt="Book cover"/>
              <div>
                <h4>{book.title}</h4>
                <p>{book.authorFirstName} {book.authorLastName}</p>
                <p>{book.coAuthorFirstName} {book.coAuthorLastName}</p>
              </div>
              <div>
                <button><Link to={`/detailbook/${book._id}`}>Detalles</Link></button>
              </div>
            </div>
          )) 
          : <Loader></Loader>}
          {books === [] && <p>Aún no tienes libros</p>}
        </div>
          {/* {lessBtn && <button onClick={pagintationLess}>Regresa</button>}
          {moreBtn && <button onClick={pagintationMore}>Ver más libros</button>} */}
      </div>
    </div>
  )
}

export default UserHome

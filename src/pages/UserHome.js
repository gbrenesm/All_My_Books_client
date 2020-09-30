import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getAllUsersBooks, getAllUserBooksAuthor } from "../services/books"
import { createShelf, getOneShelf } from "../services/shelves"
import useInput from "../hooks/useInput"
import Loader from "../components/Loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"

function UserHome() {
  const [books, setBooks] = useState(null)
  const [shelves, setShelves] = useState(null)
  const [changePage, setChangePage] = useState(false)
  const [elemPages, setElemPages] = useState(12)
  const [cutElem, setCutElem] = useState(0)
  const [lessBtn, setLessbtn] = useState(false)
  const [moreBtn, setMoreBtn] = useState(false)
  const [showNewShelf, setShowNewShelf] = useState(false)
  const [newShlef, setNewShlef] = useState(false)
  const nameInput = useInput("")
  const searchInput = useInput("")

  function pagesBtn(){
    
  }

  function pagintationMore(){
    setCutElem(cutElem + 12)
    setElemPages(elemPages + 12)
    setChangePage(true)
    setLessbtn(true)
  }

  function pagintationLess(){
    setCutElem(cutElem - 12)
    setElemPages(elemPages - 12)
    setChangePage(true)
  }

  async function fetchAllBooks() {
    const userbooks = await getAllUsersBooks()
    setBooks(userbooks.user.books)
    setShelves(userbooks.user.shelves)
    if (userbooks.user.books.length >= 12) setMoreBtn(true)
  }

  async function fetchBookByShelf(shelfId){
    const booksByShelf = await getOneShelf(shelfId)
    setBooks(booksByShelf.books.books)
  }

  async function fetchBooksByAuthor(){
    const userbooks = await getAllUserBooksAuthor()
    setBooks(userbooks.user.books)
  }

  async function submitShelvesForm(e){
    e.preventDefault()
    await createShelf({
      name: nameInput.value
    })
    setShowNewShelf(false)
    setNewShlef(true)
  }

  function submitSearch(e){
    e.preventDefault()
    setBooks(books.filter(book => book.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                                  book.authorFirstName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                                  book.authorLastName.toLowerCase().includes(searchInput.value.toLowerCase())))
    if (searchInput.value === "") fetchAllBooks()
  }
  
  function showForm(){
    if (showNewShelf) setShowNewShelf(false)
    else setShowNewShelf(true)
  }

  useEffect(() => {
    fetchAllBooks()
    setChangePage(false)
    setNewShlef(false)
  }, [changePage, newShlef])


  return (
    <div className="userhome">
      <div>
        <h2>Estantes</h2>
          {!showNewShelf && <button onClick={showForm}><FontAwesomeIcon icon={faPlus}/>&nbsp;&nbsp;Crear nuevo estante</button>}
          {showNewShelf && 
            <form onSubmit={submitShelvesForm}>
              <label><b>Nombre del estante: </b></label>
              <input required type="text" name="name" id="name" {...nameInput}/>
              <button type="submit">Crear estante</button>
              <button onClick={showForm}>Cancelar</button>
            </form>}
        <ul>
          <li><Link onClick={fetchAllBooks}><FontAwesomeIcon icon={faBook}/>&nbsp;&nbsp;Todos tus libros</Link></li>
          {shelves?.map((shelf, i) => (
          <li key={i}><Link onClick={() => fetchBookByShelf(shelf._id)}><FontAwesomeIcon icon={faBook}/>&nbsp;&nbsp;{shelf.name}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <form onChange={submitSearch} onSubmit={submitSearch} className="search">
        <input type="text" className="searchTerm" placeholder="Busca por autor(a) o título" {...searchInput}/>
        <button className="searchButton"><FontAwesomeIcon icon={faSearch}/></button>
        </form>
        <div>
          <button onClick={fetchBooksByAuthor}>Ver por autor</button>
          <button onClick={fetchAllBooks}>Ver por título</button>
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
                <button><Link to={`/detialbook/${book._id}`}>Detalles</Link></button>
              </div>
            </div>
          )) 
          : <Loader></Loader>}
          {books === [] && <p>Aún no tienes libros</p>}
        </div>
          {lessBtn && <button onClick={pagintationLess}>Regresa</button>}
          {moreBtn && <button onClick={pagintationMore}>Ver más libros</button>}
      </div>
    </div>
  )
}

export default UserHome

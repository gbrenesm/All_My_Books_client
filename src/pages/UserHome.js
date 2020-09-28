import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getAllUsersBooks } from "../services/books"
import { createShelf, getOneShelf } from "../services/shelves"
import useInput from "../hooks/useInput"
import Loader from "../components/Loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from "@fortawesome/free-solid-svg-icons"

function UserHome() {
  const [books, setBooks] = useState(null)
  const [shelves, setShelves] = useState(null)
  const [changePage, setChangePage] = useState(false)
  const [page, setPage] = useState(1)
  const [lessbtn, setLessbtn] = useState(false)
  const [showNewShelf, setShowNewShelf] = useState(false)
  const [newShlef, setNewShlef] = useState(false)
  const nameInput = useInput("")

  function pagintationMore(){
    setPage(page + 1)
    setChangePage(true)
    setLessbtn(true)
    console.log(page)
  }

  function pagintationLess(){
    if (page <= 1) setLessbtn(false)
    else setPage(page - 1)
    setChangePage(true)
    console.log(page)
  }

  async function fetchAllBooks() {
    const userbooks = await getAllUsersBooks(page)
    setBooks(userbooks.user.books)
    setShelves(userbooks.user.shelves)
  }

  async function fetchBookByShelf(shelfId){
    const booksByShelf = await getOneShelf(shelfId)
    //setBooks(booksByShelf.books)
   }

  async function submitForm(e){
    e.preventDefault()
    await createShelf({
      name: nameInput.value
    })
    setShowNewShelf(false)
    setNewShlef(true)
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
        <h3>Estantes</h3>
        <ul>
          {!showNewShelf && <button onClick={showForm}>Agrega un nuevo estante</button>}
          {showNewShelf && 
            <form onSubmit={submitForm}>
              <label>Nombre del estante</label>
              <input required type="text" name="name" id="name" {...nameInput}/>
              <button type="submit">Crear estante</button>
              <button onClick={showForm}>Cancelar</button>
            </form>}
          <li><FontAwesomeIcon icon={faBook}/>&nbsp;Todos tus libros</li>
          {shelves?.map((shelf, i) => (
          <li key={i}><Link onClick={() => fetchBookByShelf(shelf._id)}><FontAwesomeIcon icon={faBook}/>&nbsp;{shelf.name}</Link></li>
          ))}
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
          )) 
          : <Loader></Loader>}
          {!books && <p>Aún no tienes libros</p>}
        </div>
          {lessbtn && <button onClick={pagintationLess}>Regresa</button>}
          {books && <button onClick={pagintationMore}>Ver más libros</button>}
      </div>
    </div>
  )
}

export default UserHome

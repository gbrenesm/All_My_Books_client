import React, {useState} from 'react'
import { Link, useHistory } from "react-router-dom"
import { deleteBook } from "../services/books"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"


function BookCardDetail({book}) {
  const [showForm, setShowForm] = useState(false)
  const history = useHistory()

  async function eliminateBook(){
    await deleteBook(book._id)
    history.push("/userhome")
  }

  function editForm(){
    if (!showForm) setShowForm(true)
    else setShowForm(false)
  }


  return (
    <div className="bookDetailCard">
        {!showForm && 
        <>
        <div>
          <div>
            <img src={book.cover} alt="Book cover"/>
          </div>
            <div>
            <button onClick={editForm}> <FontAwesomeIcon icon={ faEdit }/>&nbsp;<Link>Editar libro</Link></button>
            <button onClick={eliminateBook}> <FontAwesomeIcon icon={ faTrashAlt }/>&nbsp; <Link to= "">Eliminar libro</Link></button>
          </div>
        </div>
        <div>
          <h2>{book.title}</h2>
          <h3>{book.authorFirstName} {book.authorLastName}</h3>
          <p><b>Editorial:</b> {book.publisher}</p>
          <p><b>Año de publicación:</b> {book.published.slice(0,4)}</p>
          <p><b>Lugar de publicación:</b> {book.publishPlace}</p>
          <p><b>Edición:</b> {book.edition}</p>
          <p><b>Formato:</b> {book.format.toLowerCase()}</p>
          <p><b>Número de páginas:</b> {book.pages}</p>
          <p><b>ISBN:</b> {book.ISBN}</p>
        </div>
        <div>
          <p><b>Reseña:</b></p>
          <p>{book.description}</p>
        </div>
        </>}
        
        {showForm &&
        <>
        <div>
          <div>
            <img src={book.cover} alt="Book cover"/>
          </div>
            <div>
            <button> <FontAwesomeIcon icon={ faEdit }/>&nbsp;<Link>Editar libro</Link></button>
            <button onClick={editForm}><Link>Cancelar</Link></button>
          </div>
        </div>
        <div>
          <h2>{book.title}</h2>
          <h3>{book.authorFirstName} {book.authorLastName}</h3>
          <p><b>Editorial:</b> {book.publisher}</p>
          <p><b>Año de publicación:</b> {book.published.slice(0,4)}</p>
          <p><b>Lugar de publicación:</b> {book.publishPlace}</p>
          <p><b>Edición:</b> {book.edition}</p>
          <p><b>Formato:</b> {book.format.toLowerCase()}</p>
          <p><b>Número de páginas:</b> {book.pages}</p>
          <p><b>ISBN:</b> {book.ISBN}</p>
        </div>
        <div>
          <p><b>Reseña:</b></p>
          <p>{book.description}</p>
        </div>
        </>}
    </div>
  )
}

export default BookCardDetail

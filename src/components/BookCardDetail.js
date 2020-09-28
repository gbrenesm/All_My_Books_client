import React, {useState, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom"
import { deleteBook, updateBook } from "../services/books"
import ShelvesInBook from "./ShelvesInBook"
import axios from "axios"
import useInput from "../hooks/useInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"


function BookCardDetail({book, setUpdateBook, bookShelves, bookId, setNewShelf}) {
  const [showForm, setShowForm] = useState(false)
  const history = useHistory()
  const titleInput = useInput(book.title)
  const authorFirstNameInput = useInput(book.authorFirstName)
  const authorLastNameInput = useInput(book.authorLastName)
  const publisherInput = useInput(book.publisher)
  const publishedInput = useInput(book.published)
  const editionInput = useInput(book.edition)
  const ISBNInput = useInput(book.ISBN)
  const publishPlaceInput = useInput(book.publishPlace)
  const pagesInput = useInput(book.pages)
  const formatInput = useInput("")
  const descriptionInput = useInput(book.description)
  const [coverURL, setCoverURL] = useState(book.cover)

  async function eliminateBook(){
    await deleteBook(book._id)
    history.push("/userhome")
  }

  function editForm(){
    if (!showForm) setShowForm(true)
    else setShowForm(false)
  }

  async function uploadCover({ target: { files } }){
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "all_my_books")

    const { data: { secure_url } } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
    setCoverURL(secure_url)
  }

  async function submitForm(e){
    e.preventDefault()
    await updateBook(book._id, {
      title: titleInput.value,
      authorFirstName: authorFirstNameInput.value,
      authorLastName: authorLastNameInput.value,
      publisher: publisherInput.value,
      published: publishedInput.value,
      edition: editionInput.value,
      ISBN: ISBNInput.value,
      publishPlace: publishPlaceInput.value,
      pages: pagesInput.value,
      format: formatInput.value,
      description: descriptionInput.value,
      cover: coverURL
    })
    setShowForm(false)
    setUpdateBook(true)
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
          <p><b>Año de publicación:</b> {book.published?.slice(0,4)}</p>
          <p><b>Lugar de publicación:</b> {book.publishPlace}</p>
          <p><b>Edición:</b> {book.edition}</p>
          <p><b>Formato:</b> {book.format?.toLowerCase()}</p>
          <p><b>Número de páginas:</b> {book.pages}</p>
          <p><b>ISBN:</b> {book.ISBN}</p>
        </div>
        <div>
          <div>
            <p><b>Reseña:</b></p>
            <p>{book.description}</p>
          </div>
          <div>
            <p><b>Estantes: </b></p>
            <ShelvesInBook shelves={bookShelves} bookId={bookId} setNewShelf={setNewShelf}></ShelvesInBook>
          </div>
        </div>
        </>}
        
        {showForm &&
        <>
        <div>
          <div>
            <img src={book.cover} alt="Book cover"/>
          </div>
            <div>
            <button onClick={editForm}><Link>Cancelar</Link></button>
          </div>
        </div>
        <form onSubmit={submitForm}>
        <label>Título</label>
        <input required type="text" name="title" id="title" {...titleInput}/>
        <br/>
        <label>Nombre del autor(a)</label>
        <input type="text" name="authorFirstName" id="authorFirstName" {...authorFirstNameInput}/>
        <br/>
        <label>Apellido del autor(a)</label>
        <input type="text" name="authorLastName" id="authorLastName" {...authorLastNameInput}/>
        <br/>
        <label>Editorial</label>
        <input type="text" name="publisher" id="publisher" {...publisherInput}/>
        <br/>
        <label>Año de publicación</label>
        <input type="text" name="published" id="published" {...publishedInput}/>
        <br/>
        <label>Edición</label>
        <input type="text" name="edition" id="edition" {...editionInput}/>
        <br/>
        <label>ISBN</label>
        <input type="text" name="ISBN" id="ISBN" {...ISBNInput}/>
        <br/>
        <label>Lugar de publicación</label>
        <input type="text" name="publishPlace" id="publishPlace" {...publishPlaceInput}/>
        <br/>
        <label>Páginas</label>
        <input type="text" name="pages" id="pages" {...pagesInput}/>
        <br/>
        <br/>
        <label>Descripción</label>
        <input type="text" name="description" id="description" {...descriptionInput}/>
        <br/>
        <label>Formato</label>
        <select required name="format" {...formatInput}>
          <option value="" selected>Selecciona una opción</option>
          <option value="TAPA BLANDA">Tapa blanda</option>
          <option value="TAPA DURA">Tapa dura</option>
          <option value="EBOOK ">Ebook</option>
        </select>
        <label>Portada</label>
        <input type="file" onChange={uploadCover}/>
        <br/>
        <button type="submit">Editar libro</button>
      </form>
        </>}
    </div>
  )
}

export default BookCardDetail

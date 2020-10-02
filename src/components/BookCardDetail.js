import React, {useState} from 'react'
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
  const coAuthorFirstNameInput = useInput(book.coAuthorFirstName)
  const coAuthorLastNameInput = useInput(book.coAuthorLastName)
  const publisherInput = useInput(book.publisher)
  const publishedInput = useInput(book.published?.slice(0,4))
  const editionInput = useInput(book.edition)
  const ISBNInput = useInput(book.ISBN)
  const publishPlaceInput = useInput(book.publishPlace)
  const pagesInput = useInput(book.pages)
  const formatInput = useInput("")
  const descriptionInput = useInput(book.description)
  const [coverURL, setCoverURL] = useState(book.cover)
  const [coauthor, setcoauthor] = useState(false)

  function eliminateBook(){
    swal({
      title:"Eliminar",
      text: "¿Estás seguro(a) de que quieres eliminar este libro?",
      buttons: {
        cancel: {
          text: "Cancelar",
          visible: true,
          className: "cancelbtn",
        },
        confirm: {
          text: "Eliminar",
          className: "aceptbtn",
        }
      },
      className: "pushnotification"
    }).then(response => {
      if (response){
        await deleteBook(book._id)
        history.push("/userhome")
      }
    })
  }

  function editForm(){
    if (book.coAuthorLastName) setcoauthor(true)
    if (!showForm) setShowForm(true)
    else setShowForm(false)
  }

  function moreAuthors(){
    if (!coauthor) setcoauthor(true)
    else setcoauthor(false)
  }

  async function uploadCover({ target: { files } }){
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "all_my_books")

    const { data: { secure_url } } = await axios.post("https://api.cloudinary.com/v1_1/dxncdwsau/image/upload", data)
    setCoverURL(secure_url)
  }

  async function submitForm(e){
    e.preventDefault()
    await updateBook(book._id, {
      title: titleInput.value,
      authorFirstName: authorFirstNameInput.value,
      authorLastName: authorLastNameInput.value,
      coAuthorFirstName:coAuthorFirstNameInput.value,
      coAuthorLastName: coAuthorLastNameInput.value,
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
            <button onClick={eliminateBook}> <FontAwesomeIcon icon={ faTrashAlt }/>&nbsp; <Link>Eliminar libro</Link></button>
          </div>
        </div>
        <div>
          <h2>{book.title}</h2>
          <h3>{book.authorFirstName} {book.authorLastName}</h3>
          <h3>{book.coAuthorFirstName} {book.coAuthorLastName}</h3>
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
            <ShelvesInBook shelves={bookShelves} bookId={bookId} setNewShelf={setNewShelf}></ShelvesInBook>
        </div>
        </>}
        
        {showForm &&
        <>
        <div>
            <img src={book.cover} alt="Book cover"/>
        </div>
        <form className="updatebook" onSubmit={submitForm}>
            <div>
              <label>Título:</label>
              <br/>
              <input required type="text" name="title" id="title" {...titleInput}/>
              <br/>
              <label>Nombre del autor(a):</label>
              <br/>
              <input type="text" name="authorFirstName" id="authorFirstName" {...authorFirstNameInput}/>
              <br/>
              <label>Apellido del autor(a):</label>
              <br/>
              <input type="text" name="authorLastName" id="authorLastName" {...authorLastNameInput}/>
              <div>
              {!coauthor && <button onClick={moreAuthors}>Agrega otro autor(a)</button>}
              </div>
              {coauthor && 
                <>
                <div>
                  <label>Nombre del coautor(a):</label>
                  <input type="text" name="author" id="author" {...coAuthorFirstNameInput}/>
                </div>
                <div>
                  <label>Apellido del coautor(a):</label>
                  <input type="text" name="author" id="author" {...coAuthorLastNameInput}/>
                </div>
                </>}
              <label>Editorial:</label>
              <input type="text" name="publisher" id="publisher" {...publisherInput}/>
              <br/>
              <label>Edición:</label>
              <input type="text" name="edition" id="edition" {...editionInput}/>
            </div>
            <div>
              <div>
                <label>Año de publicación:</label>
                <input type="text" name="published" id="published" {...publishedInput}/>
              </div>
              <div>
                <label>Lugar de publicación:</label>
                <input type="text" name="publishPlace" id="publishPlace" {...publishPlaceInput}/>
              </div>
              <div>
                <label>ISBN: </label>
                <input type="text" name="ISBN" id="ISBN" {...ISBNInput}/>
              </div>
              <div>
                <label>Páginas:</label>
                <input type="text" name="pages" id="pages" {...pagesInput}/>
              </div>
              <div>
                <label>Formato:</label>
                <select required name="format" {...formatInput}>
                  <option value="" selected>Selecciona una opción</option>
                  <option value="TAPA BLANDA">Tapa blanda</option>
                  <option value="TAPA DURA">Tapa dura</option>
                  <option value="EBOOK ">Ebook</option>
                </select>
              </div>
                <label>Portada: </label>
                <div className="button-wrapper updatebookupload">
                  <span className="label">Agrega un archivo</span>  
                  <input onChange={uploadCover} type="file" name="upload" id="upload" className="upload-box" placeholder="Upload File"/>
                </div>
                <label>Descripción</label>
                <textarea type="text" name="description" id="description" {...descriptionInput}/>
                <div>
                  <button type="submit">Editar</button>
                  <button onClick={editForm}>Cancelar</button>
                </div>
            </div>
      </form>
        </>}
    </div>
  )
}

export default BookCardDetail
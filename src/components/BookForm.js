import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from "axios"
import { createBook } from "../services/books"
import useInput from "../hooks/useInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen, faPlus } from "@fortawesome/free-solid-svg-icons"


function BookForm({ book }) {
  const history = useHistory()
  const titleInput = useInput(book.title)
  const authorFirstNameInput = useInput(book.authors? book.authors[0].slice(0, book.authors[0].indexOf(" ")): "")
  const authorLastNameInput = useInput(book.authors? book.authors[0].slice(book.authors[0].indexOf(" "), book.authors[0].length): "")
  const coAuthorFirstNameInput = useInput(book.authors[1]? book.authors[1].slice(0, book.authors[0].indexOf(" ")): "")
  const coAuthorLastNameInput = useInput(book.authors[1]? book.authors[1].slice(book.authors[0].indexOf(" "), book.authors[0].length): "")
  const publisherInput = useInput(book.publisher)
  const publishedInput = useInput(book.publishedDate)
  const editionInput = useInput("")
  const ISBNInput = useInput(book.industryIdentifiers? book.industryIdentifiers[0].identifier : "")
  const publishPlaceInput = useInput("")
  const pagesInput = useInput(book.pageCount)
  const formatInput = useInput("")
  const descriptionInput = useInput(book.description)
  const [imageURL, setImageURL] = useState(null)
  const [coauthor, setcoauthor] = useState(false)

  function moreAuthors(){
    if (!coauthor) setcoauthor(true)
    else setcoauthor(false)
    console.log(book)
  }

  function defaultImage(){
    setImageURL(book.imageLinks.thumbnail)
  }

  async function uploadCover({ target: { files } }){
    try {
      const data = new FormData()
      data.append("file", files[0])
      data.append("upload_preset", "all_my_books")
      const { data: { secure_url } } = await axios.post("https://api.cloudinary.com/v1_1/dxncdwsau/image/upload", data)
      console.log(secure_url)
      setImageURL(secure_url)
    } catch (error) {
      console.log(error)
    }
  }

  async function submitForm(e){
    e.preventDefault()
    await createBook({
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
      cover: imageURL
    })
    history.push("/userhome")
  }

  return (
    <form onSubmit={submitForm}>
    <div>
      <label>Título:</label>
      <input autoFocus required type="text" name="title" id="title" {...titleInput}/>
    </div>
    <div className="author">
      <div>
        <label>Nombre del autor(a):</label>
        <input type="text" name="author" id="author"  {...authorFirstNameInput}/>
      </div>
      <div>
        <label>Apellido del autor(a):</label>
        <input type="text" name="author" id="author" {...authorLastNameInput}/>
      </div>
    </div>
    <div>
      {!coauthor && <button onClick={moreAuthors}><FontAwesomeIcon icon={faPlus}/>&nbsp;&nbsp;Agrega otro autor(a)</button>}
    </div>
    {coauthor && 
      <div className="author">
        <div>
          <label>Nombre del coautor(a):</label>
          <input type="text" name="author" id="author" {...coAuthorFirstNameInput}/>
        </div>
        <div>
          <label>Apellido del coautor(a):</label>
          <input type="text" name="author" id="author" {...coAuthorLastNameInput}/>
        </div>
      </div>}
    <div className="author">
      <div>
        <label>Editorial:</label>
        <input type="text" name="publisher" id="publisher" {...publisherInput}/>
      </div>
      <div>
        <label>Edición:</label>
        <input type="text" name="edition" id="edition" {...editionInput}/>
      </div>
    </div>
    <div className="author">
      <div>
        <label>Año de publicación:</label>
        <input type="text" name="published" id="published" {...publishedInput}/>
      </div>
      <div>
        <label>Lugar de publicación:</label>
        <input type="text" name="publishPlace" id="publishPlace" {...publishPlaceInput}/>
      </div>
    </div>
    <div className="author">
      <div>
        <label>ISBN:</label>
        <input type="text" name="ISBN" id="ISBN" {...ISBNInput}/>
      </div>
      <div>
        <label>Páginas:</label>
        <input type="text" name="pages" id="pages"  {...pagesInput}/>
      </div>
    </div>
    <div className="uploadcover">
      <label>Portada: </label>
      <div>
        <label for="apa">Selecciona la imagen por defecto</label>
        <input type="checkbox" name="reference" value="apa" onChange={defaultImage}/>
      </div>
      <div className="button-wrapper">
        <span className="label">O agrega un archivo</span>
        <input onChange={uploadCover} type="file" name="upload" id="upload" className="upload-box" placeholder="Upload File"/>
      </div>
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
    <div>
      <label>Descripción:</label>
      <textarea type="text" name="description" id="description" {...descriptionInput}/>
    </div>
    
    <div>
      <button disabled={!imageURL} type="submit"><FontAwesomeIcon icon={faBookOpen}/>&nbsp;Crear libro</button>
    </div>
  </form>
  )
}

export default BookForm

import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { createBook } from "../services/books"
import useInput from "../hooks/useInput"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen, faPlus } from "@fortawesome/free-solid-svg-icons"
import GoogleSearch from "../components/GoogleSearch"


function NewBook({ history }) {
  const titleInput = useInput("")
  const authorFirstNameInput = useInput("")
  const authorLastNameInput = useInput("")
  const coAuthorFirstNameInput = useInput("")
  const coAuthorLastNameInput = useInput("")
  const publisherInput = useInput("")
  const publishedInput = useInput("")
  const editionInput = useInput("")
  const ISBNInput = useInput("")
  const publishPlaceInput = useInput("")
  const pagesInput = useInput("")
  const formatInput = useInput("")
  const descriptionInput = useInput("")
  const [imageURL, setImageURL] = useState(null)
  const [coauthor, setcoauthor] = useState(false)
  const [bookFromScratch, setBookFromScratch] = useState(false)


  function bookFrom0(){
    setBookFromScratch(true)
  }

  function moreAuthors(){
    if (!coauthor) setcoauthor(true)
    else setcoauthor(false)
  }

  function defaultImage(){
    setImageURL("https://res.cloudinary.com/dxncdwsau/image/upload/v1601179377/All%20My%20Books/All_My_Books_fwa6ma.jpg")
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
    <>
    <div className="addbookGoogle">
      <h2>Añade un libro desde google</h2>
      <GoogleSearch setBookFromScratch={setBookFromScratch}/>
      <h2><Link onClick={bookFrom0}>O crea un nuevo libro</Link></h2>
    </div>
    {bookFromScratch && 
    <div className="newbook">
      <form onSubmit={submitForm}>
        <div>
          <label>Título:</label>
          <input autoFocus required type="text" name="title" id="title" placeholder="Frankenstein o el moderno Prometeo" {...titleInput}/>
        </div>
        <div className="author">
          <div>
            <label>Nombre del autor(a):</label>
            <input type="text" name="author" id="author" placeholder="Mary" {...authorFirstNameInput}/>
          </div>
          <div>
            <label>Apellido del autor(a):</label>
            <input type="text" name="author" id="author" placeholder="Shelley" {...authorLastNameInput}/>
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
            <input type="text" name="publisher" id="publisher" placeholder="Lackington, Hughes & Harding" {...publisherInput}/>
          </div>
          <div>
            <label>Edición:</label>
            <input type="text" name="edition" id="edition" placeholder="primera edición" {...editionInput}/>
          </div>
        </div>
        <div className="author">
          <div>
            <label>Año de publicación:</label>
            <input type="text" name="published" id="published" placeholder="1818" {...publishedInput}/>
          </div>
          <div>
            <label>Lugar de publicación:</label>
            <input type="text" name="publishPlace" id="publishPlace" placeholder="Londres" {...publishPlaceInput}/>
          </div>
        </div>
        <div className="author">
          <div>
            <label>ISBN:</label>
            <input placeholder="000-0-00-000000-0" type="text" name="ISBN" id="ISBN" {...ISBNInput}/>
          </div>
          <div>
            <label>Páginas:</label>
            <input type="text" name="pages" id="pages" placeholder="280" {...pagesInput}/>
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
          <textarea type="text" name="description" id="description" placeholder="La novela narra la historia de Víctor Frankenstein, un estudiante de medicina en Ingolstadt, obsesionado por conocer «los secretos del cielo y la tierra»." {...descriptionInput}/>
        </div>
        
        <div>
          <button disabled={!imageURL} type="submit"><FontAwesomeIcon icon={faBookOpen}/>&nbsp;Crear libro</button>
        </div>
      </form>
    </div>}
    </>
  )
}

export default NewBook

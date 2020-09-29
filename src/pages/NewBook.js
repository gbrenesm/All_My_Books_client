import React, { useState } from 'react'
import { createBook } from "../services/books"
import useInput from "../hooks/useInput"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"


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
  const [imageURL, setImageURL] = useState("https://res.cloudinary.com/dxncdwsau/image/upload/v1601179377/All%20My%20Books/All_My_Books_fwa6ma.jpg")
  const [coauthor, setcoauthor] = useState(false)

  function moreAuthors(){
    if (!coauthor) setcoauthor(true)
    else setcoauthor(false)
  }

  async function uploadCover({ target: { files } }){
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "all_my_books")
    const { data: { secure_url } } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
    setImageURL(secure_url)
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
    <div className="newbook">
      <h2>Crea un nuevo libro</h2>
      <form onSubmit={submitForm}>
        <div>
          <label>Título:</label>
          <input required type="text" name="title" id="title" {...titleInput}/>
        </div>
        <div>
          <label>Nombre del autor(a):</label>
          <input type="text" name="author" id="author" {...authorFirstNameInput}/>
        </div>
        <div>
          <label>Apellido del autor(a):</label>
          <input type="text" name="author" id="author" {...authorLastNameInput}/>
        </div>
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
        <div>
          <label>Editorial:</label>
          <input type="text" name="publisher" id="publisher" {...publisherInput}/>
        </div>
        <div>
          <label>Año de publicación:</label>
          <input type="text" name="published" id="published" {...publishedInput}/>
        </div>
        <div>
          <label>Edición:</label>
          <input type="text" name="edition" id="edition" {...editionInput}/>
        </div>
        <div>
          <label>ISBN:</label>
          <input type="text" name="ISBN" id="ISBN" {...ISBNInput}/>
        </div>
        <div>
          <label>Lugar de publicación:</label>
          <input type="text" name="publishPlace" id="publishPlace" {...publishPlaceInput}/>
        </div>
        <div>
          <label>Páginas:</label>
          <input type="text" name="pages" id="pages" {...pagesInput}/>
        </div>
        <div>
          <label>Descripción:</label>
          <textarea type="text" name="description" id="description" {...descriptionInput}/>
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
          <label>Portada: </label>
          <input type="file" onChange={uploadCover}/>
        </div>
        <div>
         <button type="submit"><FontAwesomeIcon icon={faBookOpen}/>&nbsp;Crear libro</button>
        </div>
      </form>
    </div>
  )
}

export default NewBook

import React, { useState } from 'react'
import { createBook } from "../services/books"
import useInput from "../hooks/useInput"
import axios from "axios"

function NewBook({ history }) {
  const titleInput = useInput("")
  const authorFirstNameInput = useInput("")
  const authorLastNameInput = useInput("")
  const publisherInput = useInput("")
  const publishedInput = useInput("")
  const editionInput = useInput("")
  const ISBNInput = useInput("")
  const publishPlaceInput = useInput("")
  const pagesInput = useInput("")
  const formatInput = useInput("")
  const descriptionInput = useInput("")
  const [imageURL, setImageURL] = useState("https://res.cloudinary.com/dxncdwsau/image/upload/v1601179377/All%20My%20Books/All_My_Books_fwa6ma.jpg")

  async function uploadCover({ target: { files } }){
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "all_my_books")
    const { data: { secure_url } } = await axios.post("http://api.cloudinary.com/v1_1/dxncdwsau/image/upload", data)
    setImageURL(secure_url)
  }

  async function submitForm(e){
    e.preventDefault()
    await createBook({
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
      cover: imageURL
    })
    history.push("/userhome")
  }

  return (
    <div className="newbook">
      <h2>Crea un nuevo libro</h2>
      <form onSubmit={submitForm}>
        <label>Título</label>
        <input required type="text" name="title" id="title" {...titleInput}/>
        <br/>
        <label>Nombre del autor(a)</label>
        <input type="text" name="author" id="author" {...authorFirstNameInput}/>
        <br/>
        <label>Apellido del autor(a)</label>
        <input type="text" name="author" id="author" {...authorLastNameInput}/>
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
        <button type="submit"> Crear libro</button>
      </form>
    </div>
  )
}

export default NewBook

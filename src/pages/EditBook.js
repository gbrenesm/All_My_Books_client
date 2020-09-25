import React, {useState} from 'react'
import useInput from "../hooks/useInput"
import axios from "axios"
import { updateBook } from '../services/books'
import { useHistory } from "react-router-dom"

function EditBook({ match: { params: { bookId } }}) {
  const titleInput = useInput("")
  const authorInput = useInput("")
  const publisherInput = useInput("")
  const publishedInput = useInput("")
  const editionInput = useInput("")
  const ISBNInput = useInput("")
  const publishPlaceInput = useInput("")
  const pagesInput = useInput("")
  const formatInput = useInput("")
  const descriptionInput = useInput("")
  const [imageURL, setImageURL] = useState(null)
  const history = useHistory()


  async function uploadCover({ target: { files } }){
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "all_my_books")

    const { data: { secure_url } } = await axios.post("http://api.cloudinary.com/v1_1/dxncdwsau/image/upload", data)
    setImageURL(secure_url)
  }

  async function submitForm(e){
    e.preventDefault()
    await updateBook(bookId, {
      title: titleInput.value,
      author: authorInput.value,
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
    history.push(`/detialbook/${bookId}`)
  }

  return (
    <div className="editbook">
      <h2>Crea un nuevo libro</h2>
      <form onSubmit={submitForm}>
        <label>Título</label>
        <input required type="text" name="title" id="title" {...titleInput}/>
        <br/>
        <label>Autor</label>
        <input type="text" name="author" id="author" {...authorInput}/>
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
        <select name="format" {...formatInput}>
          <option>Selecciona</option>
          <option value="TAPA BLANDA">Tapa blanda</option>
          <option value="TAPA DURA">Tapa dura</option>
          <option value="EBOOK ">Ebook</option>
        </select>
        <label>Portada</label>
        <input type="file" onChange={uploadCover}/>
        <br/>
        <button type="submit">Editar libro</button>
      </form>
    </div>
  )
}

export default EditBook

import React, {useState} from 'react'
import { createShelf, getOneShelf } from "../services/shelves"
import useInput from "../hooks/useInput"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons"


function ShlevesUserHome({shelves, setNewShlef, fetchAllBooks, setBooks}) {
  const nameInput = useInput("")
  const [showNewShelf, setShowNewShelf] = useState(false)

  async function fetchBookByShelf(shelfId){
    const booksByShelf = await getOneShelf(shelfId)
    setBooks(booksByShelf.books.books)
  }

  async function submitShelvesForm(e){
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

  return (
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
  )
}

export default ShlevesUserHome

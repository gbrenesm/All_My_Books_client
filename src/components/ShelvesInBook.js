import React, { useState, useEffect } from 'react'
import { addBookShelf, getUserShelves, removeBookShelf } from "../services/shelves"
import useInput from "../hooks/useInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"



function ShelvesInBook({shelves, bookId, setNewShelf}) {
  const nameIpunt = useInput("")
  const [showAddShelf, setShowAddShelf] = useState(false)
  const [allUserShelves, setAllUserShelves] = useState(null)

  function formatAddShelf(){
    if (!showAddShelf) setShowAddShelf(true)
    else setShowAddShelf(false)
  }

  async function fetchUsersShelves(){
    const userShelves = await getUserShelves()
    setAllUserShelves(userShelves.shelves.shelves)
  }

  async function removeBook(shelfId){
    await removeBookShelf(bookId, {
      shelfId
    })
    setNewShelf(true)
  }

  async function submitForm(e){
    e.preventDefault()
    await addBookShelf(bookId, {
      shelfId: nameIpunt.value
    })
    setShowAddShelf(false)
    setNewShelf(true)
  }

  useEffect(() => {
    fetchUsersShelves()
  }, [])

  return (
    <div className="bookshelves">
      <p><b>Estantes:</b></p>
      <div>
        {shelves?.map((e, i)=>(
          <div>
            <p key={i}>{e.name}</p>
            <button onClick={() => removeBook(e._id)}><FontAwesomeIcon icon={faTrash}/>&nbsp;Quitar</button>
          </div>
        ))}
      </div>
      {!showAddShelf && <button onClick={formatAddShelf}> <FontAwesomeIcon icon={faPlus}/>&nbsp;&nbsp; Añade el libro a un estante</button>}
      {showAddShelf && 
        <form onSubmit={submitForm}>
          <select required name="shelf" {...nameIpunt}>
            <option value="" selected>Selecciona un estante</option>
            {allUserShelves?.map((e, i) => (
              <option value={e._id}> {e.name}</option>
            ))}
          </select>
          <button type="submit">Añade libro</button>
          <button className="cancel" onClick={formatAddShelf}>Cancelar</button>
        </form>}
    </div>
  )
}

export default ShelvesInBook

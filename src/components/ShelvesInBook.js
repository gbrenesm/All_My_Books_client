import React, { useState, useEffect } from 'react'
import { addBookShelf, getUserShelves, removeBookShelf } from "../services/shelves"
import useInput from "../hooks/useInput"

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
    <div>
      
    {!showAddShelf && 
      <div>
        {shelves? shelves.map((e, i)=>(
          <>
            <p>{e.name}</p>
            <button onClick={() => removeBook(e._id)}>Quitar estante</button>
          </>
        ))
       
    : <p>Aún no tienes estantes</p>}
    <button onClick={formatAddShelf}>Añade el libro a un estante</button>
    </div>}
       
    {showAddShelf && 
    <form onSubmit={submitForm}>
      <label>Añade a un estante</label>
      <select required name="shelf" {...nameIpunt}>
        <option value="" selected>Selecciona un estante</option>
        {allUserShelves?.map((e, i) => (
          <option value={e._id}> {e.name}</option>
        ))}
      </select>
        <button type="submit">Añade libro</button>
    </form>}
    </div>
  )
}

export default ShelvesInBook

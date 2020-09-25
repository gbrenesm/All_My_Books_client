import React, { useState } from 'react'
import useInput from "../hooks/useInput"
import { createNote } from "../services/notes"

function NewNote({bookIdToUse, setNewNote}) {
  const descriptionInput = useInput("")
  const chapterInput = useInput("")
  const pagesInput = useInput("")
  const [showFrom, setShowFrom] = useState(false)

  async function submitForm(e){
    e.preventDefault()
    await createNote(bookIdToUse, {
      description: descriptionInput.value,
      chapter: chapterInput.value,
      pages: pagesInput.value
    })
    setShowFrom(false)
    setNewNote(true)
  }

  function changeForm(){
    if (!showFrom) setShowFrom(true)
    else setShowFrom(false)
  }

  return (
    <div>
      <button onClick={changeForm}>Agregar nota</button>
      {showFrom && 
        <form onSubmit={submitForm}>
          <label>Descripción:</label>
          <textarea required type="text" name="description" id="description" {...descriptionInput}></textarea>
          <label>Capítulo relacionado:</label>
          <input type="text" name="chapter" id="chapter" {...chapterInput}></input>
          <label>Páginas:</label>
          <input type="text" name="pages" id="pages" {...pagesInput}></input>
          <button type="submit"> Crear nota</button>
          <button onClick={changeForm}>Cancelar</button>
        </form>
      }
    </div>
  )
}

export default NewNote

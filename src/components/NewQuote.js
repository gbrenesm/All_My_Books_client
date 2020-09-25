import React, { useState } from 'react'
import useInput from "../hooks/useInput"
import { createQuote } from "../services/quote"

function NewQuote({bookIdToUse, setNewQuote}) {
  const descriptionInput = useInput("")
  const noteInput = useInput("")
  const pagesInput = useInput("")
  const [showFrom, setShowFrom] = useState(false)

  async function submitForm(e){
    e.preventDefault()
    await createQuote(bookIdToUse, {
      description: descriptionInput.value,
      chapter: noteInput.value,
      pages: pagesInput.value
    })
    setShowFrom(false)
    setNewQuote(true)
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
          <label>Nota:</label>
          <textarea type="text" name="note" id="note" {...noteInput}></textarea>
          <label>Páginas:</label>
          <input type="text" name="pages" id="pages" {...pagesInput}></input>
          <button type="submit"> Crear cita</button>
          <button onClick={changeForm}>Cancelar</button>
        </form>
      }
    </div>
  )
}

export default NewQuote

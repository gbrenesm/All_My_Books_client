import React, { useState } from 'react'
import useInput from "../hooks/useInput"
import { createQuote } from "../services/quote"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons"


function NewQuote({bookIdToUse, setNewQuote}) {
  const descriptionInput = useInput("")
  const noteInput = useInput("")
  const pagesInput = useInput("")
  const [showFrom, setShowFrom] = useState(false)

  async function submitForm(e){
    e.preventDefault()
    await createQuote(bookIdToUse, {
      description: descriptionInput.value,
      note: noteInput.value,
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
    <div className="newnoteformat">
      {!showFrom && <button onClick={changeForm}><FontAwesomeIcon icon={faFeatherAlt}/>Agrega una nueva cita</button>}
      {showFrom && 
        <form className="newquote" onSubmit={submitForm}>
          <label>Cita textual:</label>
          <textarea required type="text" name="description" id="description" placeholder="Escribe aquí la cita que quieras guardar, no es necesario ponerla entre comillas" {...descriptionInput}></textarea>
          <label>Nota:</label>
          <textarea type="text" name="note" id="note" placeholder="¿Algún pensamiento relacionada a la cita?" {...noteInput}></textarea>
          <label>Páginas:</label>
          <input type="text" name="pages" id="pages" placeholder="Ejs. 2-4, 7 y 15" {...pagesInput}></input>
          <div className="newquote">
            <button type="submit"> Crear cita</button>
            <button onClick={changeForm}>Cancelar</button>
          </div>
        </form>
      }
    </div>
  )
}

export default NewQuote

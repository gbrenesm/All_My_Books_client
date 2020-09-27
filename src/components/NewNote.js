import React, { useState } from 'react'
import useInput from "../hooks/useInput"
import { createNote } from "../services/notes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons"


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
    <div className="newnoteformat">
      {!showFrom && <button onClick={changeForm}><FontAwesomeIcon icon={faFeatherAlt}/> Agregar nueva nota</button>}
      {showFrom && 
        <form onSubmit={submitForm}>
          <label>Descripción:</label>
          <textarea required autofocus type="text" name="description" id="description" placeholder="Escribe aquí todo lo que quiras guardar sobre el libro..." {...descriptionInput}></textarea>
          <div>
            <div>
              <label>Capítulo relacionado:&nbsp;</label>
              <input type="text" name="chapter" id="chapter" placeholder="Ejs. Capítulo 1, cap I, Prefacio" {...chapterInput}></input>
            </div>
            <div>
              <label>Páginas:&nbsp;</label>
              <input type="text" name="pages" id="pages" placeholder="Ejs. 2-4, 7 y 15"{...pagesInput}></input> 
            </div>
          </div>
          <div>
            <button type="submit"> Crear nota</button>
            <button onClick={changeForm}>Cancelar</button>
          </div>
        </form>
      }
    </div>
  )
}

export default NewNote

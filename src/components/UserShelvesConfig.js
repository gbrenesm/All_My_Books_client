import React, {useEffect, useState} from 'react'
import { getUserShelves, deleteShelf } from "../services/shelves"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import swal from "@sweetalert/with-react"

function UserShelvesConfig() {
  const [shelves, setShelves] = useState(null)
  const [shelfDeleted, setShelfDeleted] = useState(false)

  async function fetchShelves(){
    const shlevesData = await getUserShelves()
    setShelves(shlevesData.shelves.shelves)
  }

  function deleteShelves(shelfID){
    swal({
      title:"Eliminar",
      text: "¿Estás seguro(a) de que quieres eliminar el estante?",
      buttons: {
        cancel: {
          text: "Cancelar",
          visible: true,
          className: "cancelbtn",
        },
        confirm: {
          text: "Eliminar",
          className: "aceptbtn",
        }
      },
      className: "pushnotification"
    }).then(response => {
      if (response){
        deleteShelf(shelfID)
        setShelfDeleted(true)
      }
    })
  }

  useEffect(() => {
    fetchShelves()
    setShelfDeleted(false)
  }, [shelfDeleted])

  return (
    <div className="configshelves">
        <h2>Estantes:</h2>
            {shelves? shelves.map((shelf, i) => (
              <div>
              <p key={i}>{shelf.name}</p>
              <button onClick={()=>{deleteShelves(shelf._id)}}><FontAwesomeIcon icon={ faTrashAlt }/>&nbsp;Eliminar</button> 
              </div>
            )) : <p>Aún no tienes estantes</p>}
    </div>
  )
}

export default UserShelvesConfig

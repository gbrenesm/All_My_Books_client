import React, { useState, useContext, useEffect } from 'react'
import { Context } from "../context"
import { Link } from "react-router-dom"
import { updateUser } from "../services/auth"
import axios from "axios"
import useInput from "../hooks/useInput"
import { getUserShelves } from "../services/shelves"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEdit } from "@fortawesome/free-solid-svg-icons"

function UserConfig() {
  const { user } = useContext(Context)
  const usernameInput = useInput(user?.username)
  const emailInput = useInput(user?.email)
  const [photoURL, setPhotoURL] = useState(user?.profilePhoto)
  const [showForm, setShowForm] = useState(false)
  const [shelves, setShelves] = useState(null)
  const [shelvesConfig, setShelvesConfig] = useState(false)
  const [showShelvesConfig, setShowShelvesConfig] = useState(false)
  const shelfNameInput = useInput(shelves?.name)


  async function fetchShelves(){
    const shlevesData = await getUserShelves()
    setShelves(shlevesData.shelves.shelves)
  }

  function shelvesForm(){
    if (!showShelvesConfig) setShowShelvesConfig(true)
    else setShowShelvesConfig(false)
  }

  function editForm(){
    if (!showForm) setShowForm(true)
    else setShowForm(false)
  }

  async function uploadPhoto({ target: { files } }){
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "all_my_books")

    const { data: { secure_url } } = await axios.post("http://api.cloudinary.com/v1_1/dxncdwsau/image/upload", data)
    setPhotoURL(secure_url)
  }

  async function submitForm(e){
    e.preventDefault()
    await updateUser(
    {
      username: usernameInput.value,
      email: emailInput.value,
      profilePhoto: photoURL
    })
    console.log(usernameInput.value)
    setShowForm(false)
  }

  useEffect(() => {
    fetchShelves()
  }, [])

  return (
    <div className="userProfile">
      <div>
        {!showForm && user?
        <div>
          <div>
            <img src={user.profilePhoto} alt="Profile"/>
          </div>
          <div>
            <h2>{user.username}</h2>
            <h3>{user.email}</h3>
            <button onClick={editForm}> <FontAwesomeIcon icon={ faEdit }/>&nbsp;<Link>Editar</Link></button>
          </div>
        </div>: <></>}
        
        {showForm && user?
        <>
        <div>
          <div>
            <img src={user.profilePhoto} alt="Profile"/>
          </div>
            <div>
            <button onClick={editForm}><Link>Cancelar</Link></button>
          </div>
        </div>
        <form onSubmit={submitForm}>
        <label>Nombre de usuario: </label>
        <input required type="text" name="username" id="username" {...usernameInput}/>
        <br/>
        <label>Email: </label>
        <input required type="text" name="email" id="email" {...emailInput}/>
        <label>Foto de perfil: </label>
        <input type="file" onChange={uploadPhoto}/>
        <button type="submit">Editar</button>
        <button onClick={editForm}>Cancelar</button>
        </form>
        </> : <></>}
      </div>
      <div>
        {!showShelvesConfig && 
        <div>
          <p><b>Estantes:</b></p>
          <ul>
            {shelves? shelves.map((shlef, i) => (
              <li>{shlef.name}</li>
            )) : <p>Aún no tienes estantes</p>}
          </ul>
          <button onClick={shelvesForm}>Edita tus estantes</button>
        </div> }
        
        {showShelvesConfig && 
          <>
          <form>
            {shelves?.map((shelf, i) => (
              <>
              <label>{shelves.name}</label>
              <input type="text" name="name" id="name" {...shelfNameInput} />
              </>
            ))}
          </form>
          <button onClick={shelvesForm}>Cancelar</button>
          </>}
      </div>
    </div>
  )
}

export default UserConfig

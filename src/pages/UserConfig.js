import React, { useState, useContext } from 'react'
import { Context } from "../context"
import { Link } from "react-router-dom"
import { updateUser } from "../services/auth"
import axios from "axios"
import useInput from "../hooks/useInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEdit } from "@fortawesome/free-solid-svg-icons"
import UserShelvesConfig from "../components/UserShelvesConfig"

function UserConfig() {
  const { user, setUserUpdate } = useContext(Context)
  const usernameInput = useInput(user?.username)
  const emailInput = useInput(user?.email)
  const [photoURL, setPhotoURL] = useState(user?.profilePhoto)
  const [showForm, setShowForm] = useState(false)

  function editForm(){
    if (!showForm) setShowForm(true)
    else setShowForm(false)
  }

  async function uploadPhoto({ target: { files } }){
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "all_my_books")

    const { data: { secure_url } } = await axios.post("https://api.cloudinary.com/v1_1/dxncdwsau/image/upload", data)
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
    setShowForm(false)
    setUserUpdate(true)
  }


  return (
    <div className="bookDetailCard userProfile">
      <div>
        <div>
          <img src={user?.profilePhoto} alt="Profile"/>
        </div>
        {!showForm && user?
        <div className="userinfo">
          <h2>{user.username}</h2>
          <h3>{user.email}</h3>
          <button onClick={editForm}><FontAwesomeIcon icon={ faEdit }/>&nbsp;<Link>Editar</Link></button>
        </div>
        : <></>}
        
        {showForm && user?
        <form onSubmit={submitForm}>
          <label>Nombre de usuario: </label>
          <input required type="text" name="username" id="username" {...usernameInput}/>
          <br/>
          <label>Email: </label>
          <input required type="text" name="email" id="email" {...emailInput}/>
          <br/>
          <label>Foto de perfil: </label>
          <input type="file" onChange={uploadPhoto}/>
          <button type="submit">Editar</button>
          <button onClick={editForm}>Cancelar</button>
        </form>: 
        <></>}
      </div>
      <UserShelvesConfig/>
    </div>
  )
}

export default UserConfig

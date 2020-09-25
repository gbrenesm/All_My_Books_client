import React, { useState } from "react"
import useInput from "../hooks/useInput"
import { signup, login } from "../services/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab } from "@fortawesome/free-brands-svg-icons"

function Home ({ history }) {
  const usernameInput = useInput("")
  const emailInput = useInput("")
  const passwordInput = useInput("")
  const [signupForm, setsignupForm] = useState(true)
  const [error, setError] = useState(false)
  const [errorMesagge, setErrorMesagge] = useState("")

  async function submitFormSignup(e){
    e.preventDefault()
    const username = usernameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    await signup({username, email, password}).catch(err => {
      console.dir(err.response.data.message)
      notificationError(err.response.data.message)})
    if (!error) setsignupForm(false)
  }

  async function submitFormLogin(e){
    e.preventDefault()
    const email = emailInput.value
    const password = passwordInput.value
    await login({email, password})
    history.push("/userhome")
  }

  function changeLogin(){
    if (signupForm) setsignupForm(false)
    else setsignupForm(true)
  }

  const notificationError = (message) =>{
    setError(true)
    setErrorMesagge(message)
  }

  return(
    <div className="homepage">
      <div>
        <h1>All My Books</h1>
        <h2>El lugar para ordenar todos tus libros</h2>
        <img src="https://res.cloudinary.com/dxncdwsau/image/upload/v1600883938/All_My_Books/Book_shelf_warm_colors_omdjq1.jpg" alt="Bookshelf by colors"/>
      </div>
      {signupForm && 
      <div>
        <h2>Crea una cuenta</h2>
          <form onSubmit={submitFormSignup}>
            <label>Nombre de usuario: </label>
            <br/>
            <input required type="text" name="username" id="username" {...usernameInput}/>
            <br/>
            <label>Email:</label>
            <br/>
            <input required type="text" name="email" id="email" {...emailInput}/>
            <br/>
            <label>Contraseña:</label>
            <br/>
            <input required type="text" name="password" id="password" {...passwordInput}/>
            <br/>
            <button type="submit">Crea tu cuenta</button>
            <FontAwesomeIcon icon={['fab', 'google']} />
          </form>
        {error && <p>{errorMesagge}</p>}
      <button onClick={changeLogin}>Inicia sesión</button>
      </div>}
      {!signupForm && 
      <div>
        <h2>Inicia sesión</h2>
          <form onSubmit={submitFormLogin}>
            <label>Email</label>
            <input required type="text" name="email" id="email" {...emailInput}/>
            <label>Contraseña</label>
            <input required type="text" name="password" id="password" {...passwordInput}/>
            <button type="submit">Inicia sesión</button>
          </form>
      <button onClick={changeLogin}>Crea una cuenta</button>
      </div>}
    </div>
  )
}

export default Home
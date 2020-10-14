import React, { useState, useContext } from "react"
import { Context } from "../context"
import useInput from "../hooks/useInput"
import { signup, login } from "../services/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons"
import swal from "sweetalert"

let baseURL

process.env.NODE_ENV === "production"
? (baseURL = "https://allmybooksmex.herokuapp.com")
: (baseURL = "http://localhost:3000")


function Home ({ history }) {
  const { ctxUser } = useContext(Context)
  const usernameInput = useInput("")
  const emailInput = useInput("")
  const passwordInput = useInput("")
  const [signupForm, setsignupForm] = useState(true)

  async function submitFormSignup(e){
    e.preventDefault()
    const username = usernameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    try {
      await signup({username, email, password})
      setsignupForm(false)
    } catch (error) {
      console.dir(error.response.data.message)
      swal({
        title: "Vuelve a intentar",
        text: error.response.data.message,
        type: "error",
        className: "alert"
      })
    }
}

  async function submitFormLogin(e){
    e.preventDefault()
    const email = emailInput.value
    const password = passwordInput.value
    try {
      const user = await login({email, password})
      ctxUser(user)
      history.push("/userhome")
    } catch (error) {
      console.dir(error.response.data.message)
      swal({
        title: "Vuelve a intentar",
        text: error.response.data.message, 
        type: "error",
        className: "alert"
      })
    }
  }
  

  function changeLogin(){
    if (signupForm) setsignupForm(false)
    else setsignupForm(true)
  }


  return(
    <div className="homepage">
      <div>
        <h1>All My Books</h1>
        <h2>El lugar para ordenar todos tus libros</h2>
        <img src="/images/Home.jpg" alt="Bookshelf by colors"/>
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
            <input required type="password" name="password" id="password" {...passwordInput}/>
            <br/>
            <button type="submit">Crea tu cuenta</button>
          </form>
          <div>
            <a href={`${baseURL}/auth/google`}><FontAwesomeIcon icon={faGoogle} /> &nbsp;Google</a>
            <a href={`${baseURL}/auth/facebook`}><FontAwesomeIcon icon={faFacebookF} />&nbsp;Facebook</a>
          </div>
          <hr/>
          <div className="signupbtn">
            <p>¿Ya tienes cuenta?</p> <button onClick={changeLogin}>Inicia sesión</button>
          </div>
      </div>}
      {!signupForm && 
      <div>
        <h2>Inicia sesión</h2>
          <form onSubmit={submitFormLogin}>
            <label>Email</label>
            <input required type="text" name="email" id="email" {...emailInput}/>
            <label>Contraseña</label>
            <input required type="password" name="password" id="password" {...passwordInput}/>
            <button type="submit">Inicia sesión</button>

          </form>
          <div>
            <a href={`${baseURL}/auth/google`}><FontAwesomeIcon icon={faGoogle} /> &nbsp;Google</a>
            <a href={`${baseURL}/auth/facebook`}><FontAwesomeIcon icon={faFacebookF} />&nbsp;Facebook</a>
          </div>
          <hr/>
          <div>
            <button onClick={changeLogin}>Crea una cuenta</button>
          </div>
      </div>}
    </div>
  )
}

export default Home
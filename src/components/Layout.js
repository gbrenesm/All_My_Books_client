import React, { useContext } from 'react'
import { Context } from "../context"
import { Link } from "react-router-dom"
import { logout } from "../services/auth"
import { useHistory } from "react-router-dom"


function Layout({ children }) {
  const { user, logoutUser } = useContext(Context)
  const history = useHistory()

  const logoutClick = async () =>{
    await logout()
    logoutUser()
    history.push("/")
  }

  return (
    <div>
      <nav>
        <div>
          <p><img src="https://res.cloudinary.com/dxncdwsau/image/upload/v1600963193/All_My_Books/%C3%8Dcono_de_libros_blanco_hajncl.png" alt="Books icon"/>&nbsp; All My Books</p>
        </div>
        <div>
          <ul>
            <li>Algo</li>
            <li>Otra cosa</li>
            <li><img src={user?.profilePhoto} alt="User"/>
              <ul>
                <li><Link to="/configprofile">Configuración</Link></li>
                <li onClick={logoutClick}>Cierra sesión</li>
              </ul>
            </li>
            
          </ul>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout

import React, { useContext } from 'react'
import { Context } from "../context"
import { Link } from "react-router-dom"
import { logout } from "../services/auth"
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

function Layout({ children }) {
  const { user, clearctxUser} = useContext(Context)
  
  const history = useHistory()

  const logoutClick = async () =>{
    await logout()
    clearctxUser()
    history.push("/")
  }


  return (
    <div>
      <nav>
        <div>
          <p><img src="/images/Books_icon.png" alt="Books icon"/>&nbsp; <Link to="/userhome">All My Books</Link></p>
        </div>
        <div>
          <ul>
          <li><Link to="/newbook">Agregar libro</Link></li>
          <li className="navicon"><img src={user?.profilePhoto} alt="User"/>&nbsp;<FontAwesomeIcon icon={faAngleDown}/>
            <ul>
              <li><Link to="/userconfig">Configuración</Link></li>
              <li onClick={logoutClick}><Link>Cerrar sesión</Link></li>
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

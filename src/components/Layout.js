import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../context"
import { Link } from "react-router-dom"
import { logout, getCurrentUser } from "../services/auth"
import { useHistory } from "react-router-dom"
import Loader from "../components/Loader"


function Layout({ children }) {
  const { user, logoutUser} = useContext(Context)
  const [profilePic, setProfilePic] = useState(null)
  
  const history = useHistory()


  const currentUser = async () => {
    getCurrentUser()
    console.log(user)
  }
  const logoutClick = async () =>{
    await logout()
    logoutUser()
    history.push("/")
  }

  useEffect(()=>{
    currentUser()
  }, [])

  return (
    <div>
      <nav>
        <div>
          <p><img src="https://res.cloudinary.com/dxncdwsau/image/upload/v1600963193/All_My_Books/%C3%8Dcono_de_libros_blanco_hajncl.png" alt="Books icon"/>&nbsp; <Link to="/userhome">All My Books</Link></p>
        </div>
        <div>
          <ul>
            <li>Algo</li>
            <li><img src={user? user.profilePhoto : <Loader></Loader>} alt="User"/>
              <ul>
                <li><Link to="/configprofile">Configuración</Link></li>
                <li onClick={logoutClick}><Link>Cierra sesión</Link></li>
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

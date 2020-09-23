import React, { createContext, useState, useEffect } from "react"
import { getCurrentUser } from "./services/auth"

export const Context = createContext()

export default function CtxProvider({ children }){
  const [user, setUser] = useState(null)

  async function getSession(){
    const { user } = await getCurrentUser()
    console.log(user)
    if (user?.email){
      loginUser(user)
    }
  }

  useEffect(() => {
    getSession()
    console.log("Hola")
  },[])

  function loginUser(user){
    setUser(user)
  }

  function logout(){
    setUser(null)
  }

  return (
    <Context.Provider value={{
      user,
      loginUser,
      logout
    }}>
      {children}
    </Context.Provider>
  )
}
import React, { createContext, useState, useEffect } from "react"
import { getCurrentUser } from "./services/auth"

export const Context = createContext()

export default function CtxProvider({ children }){
  const [user, setUser] = useState(null)

  // async function getSession(){
  //   const { user } = await getCurrentUser()
  //   //console.log(user)
  //   if (user?.email){
  //     loginUser(user)
  //   }
  // }

  // useEffect(() => {
  //   getSession()
  // },[])

  const ctxUser = loginUser => setUser(loginUser)
  const clearctxUser = () => setUser(null)

  return (
    <Context.Provider value={{
      user,
      ctxUser,
      clearctxUser
    }}>
      {children}
    </Context.Provider>
  )
}
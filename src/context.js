import React, { createContext, useState, useEffect } from "react"
import { getCurrentUser } from "./services/auth"

export const Context = createContext()

export default function CtxProvider({ children }){
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function userdata() {
      const { user } = await getCurrentUser()
      setUser(user)
    }
    userdata()
  },[])

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
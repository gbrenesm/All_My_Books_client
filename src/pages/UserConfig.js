import React, { useState, useEffect } from 'react'
import { getCurrentUser, updateUser } from "../services/auth"
import useInput from "../hooks/useInput"

function UserConfig() {
  const [user, setUser] = useState(null)

  async function fetchUser(){
    const currentUser = getCurrentUser()
    setUser(currentUser)
    console.log(currentUser)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div>
      <h1>Profile Cofiguration</h1>
      {user? <p> {user.username}</p> : <p>No hay usuario</p>}
    </div>
  )
}

export default UserConfig

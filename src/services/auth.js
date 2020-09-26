import axios from "axios"

const baseURL = "http://localhost:3000/auth"

const service = axios.create({ baseURL, withCredentials: true })

export const signup = async user => {
  await service.post("/signup", user)
  return true
}

export const login = async userData => {
  const { data: user } = await service.post("/login", userData)
  //console.log(user)
  return user
}

export const getCurrentUser = async () => {
  const { data: user } = await service.get("/currentuser")
  //console.log(user)
  return user
}

export const logout = async () => {
  await service.get("/logout")
}
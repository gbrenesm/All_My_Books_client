import axios from "axios"

const baseURL = process.env.NODE_ENV === `production`? `/auth` : "http://localhost:3000/auth"

const service = axios.create({ baseURL, withCredentials: true })

export const signup = async user => {
  await service.post("/signup", user)
  return true
}

export const login = async userData => {
  const { data: user } = await service.post("/login", userData)
  return user
}

export const googleLogin = async () => {
  return await service.get("/google")
}

export const getCurrentUser = async () => {
  const { data: user } = await service.get("/currentuser")
  return user
}

export const updateUser = async userData => {
  const { data: user } = await service.put("/updateuser", userData)
  return user
}

export const logout = async () => {
  await service.get("/logout")
}

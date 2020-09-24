import axios from "axios"

const baseURL = "http://localhost:3000/api"
const service = axios.create({ baseURL, withCredentials: true })

export const getAllUsersBooks = async () => {
  const { data: books } = await service.get("/userbooks")
  return books
}
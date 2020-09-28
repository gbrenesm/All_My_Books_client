import axios from "axios"

const baseURL = "http://localhost:3000/api"
const service = axios.create({ baseURL, withCredentials: true })

export const createShelf = async shelfData => {
  await service.post("/shelfnew", shelfData)
}


export const getOneShelf = async shelfId => {
  const { data: shelf } = await service.get(`/booksshlef/${shelfId}`)
  return shelf
}

export const getUserShelves = async () => {
  const { data: shelves } = await service.get(`usershelves`)
  return shelves
}

export const addBookShelf = async (bookId, shelfData) => {
  const { data: shelf } = await service.put(`addbook/${bookId}`, shelfData)
  return shelf
}

export const removeBookShelf = async (bookId, shelfId) => {
  await service.put(`removebook/${bookId}`, shelfId)
}

export const deleteShelf = async shelfId => {
  await service.delete(`shelfdelete/${shelfId}`)
}
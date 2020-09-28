import axios from "axios"

const baseURL = process.env.NODE_ENV === `production`? `/api` : "http://localhost:3000/api"
const service = axios.create({ baseURL, withCredentials: true })

export const createBook = async bookData => {
  await service.post("/newbook", bookData)
  return true
}

export const getAllUsersBooks = async page => {
  const { data: books } = await service.get(`/userbooks/${page}`)
  return books
}

export const getBookDetail = async bookId => {
  const { data: book } = await service.get(`/detailbook/${bookId}`)
  return book
}

export const updateBook = async (bookId, bookData) => {
  const { data: book } = await service.put(`/updatebook/${bookId}`, bookData)
  return book
}

export const deleteBook = async bookId => {
  await service.delete(`/deletebook/${bookId}`)
}
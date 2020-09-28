import axios from "axios"

const baseURL = process.env.NODE_ENV === `production`? `/api` : "http://localhost:3000/api"
const service = axios.create({ baseURL, withCredentials: true })

export const createNote = async (bookId, noteData) => {
  await service.post(`/note/${bookId}`, noteData)
  return true
}

export const updateNote = async noteData => {
  const { data: note } = await service.put("", noteData)
  return note
}

export const deleteNote = async noteId => {
  await service.delete(`/notedelete/${noteId}`)
}
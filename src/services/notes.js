import axios from "axios"

const baseURL = "http://localhost:3000/api"
const service = axios.create({ baseURL, withCredentials: true })

export const createNote = async noteData => {
  await service.post("", noteData)
  return true
}

export const updateNote = async noteData => {
  const { data: note } = await service.put("", noteData)
  return note
}

export const deleteNote = async noteId => {
  await service.delete(`/notedelete/${noteId}`)
}
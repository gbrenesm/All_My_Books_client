import axios from "axios"

const baseURL = process.env.NODE_ENV === `production`? `/api` : "http://localhost:3000/api"
const service = axios.create({ baseURL, withCredentials: true })

export const createQuote = async (bookId, quoteData) => {
  await service.post(`/quote/${bookId}`, quoteData)
  return true
}

export const updateQuote = async quoteData => {
  const { data: quote } = await service.put("", quoteData)
  return quote
}

export const deleteQuote = async quoteId => {
  await service.delete(`/quotedelete/${quoteId}`)
}
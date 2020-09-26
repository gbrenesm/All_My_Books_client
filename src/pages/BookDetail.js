import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom"
import Loader from "../components/Loader"
import { getBookDetail, deleteBook } from "../services/books"
import { deleteNote } from "../services/notes"
import { deleteQuote } from "../services/quote"
import NewNote from "../components/NewNote"
import NewQuote from "../components/NewQuote"

function BookDetail({ match: { params: { bookId } }}) {
  const history = useHistory()
  const [book, setBook] = useState(null)
  const [notes, setNotes] = useState(true)
  const [quotes, setQuotes] = useState(false)
  const [references, setReferences] = useState(false)
  const [allNotes, setAllNotes] = useState(null)
  const [allQuotes, setAllQuotes] = useState(null)
  const [newNote, setNewNote] = useState(false)
  const [newQuote, setNewQuote] = useState(false)

  async function fetchBook() {
    const detailbook = await getBookDetail(bookId)
    setBook(detailbook.book)
    setAllNotes(detailbook.book.notes)
    setAllQuotes(detailbook.book.quotes)
  }

  async function eliminateBook(){
    await deleteBook(bookId)
    history.push("/userhome")
  }

  async function eliminateNote(id){
    await deleteNote(id)
    setNewNote(true)
  }

  async function eliminateQuote(id){
    await deleteQuote(id)
    setNewQuote(true)
  }

  function showNotes(){
    setNotes(true)
    setQuotes(false)
    setReferences(false)
  }

  function showQuotes(){
    setNotes(false)
    setQuotes(true)
    setReferences(false)
  }

  function showReferences(){
    setNotes(false)
    setQuotes(false)
    setReferences(true)
  }

  useEffect(() => {
    fetchBook()
    setNewNote(false)
    setNewQuote(false)
  }, [newNote, newQuote])

  return (
    <div className="bookdetail">
        {book? 
          <>
          <div>
              <div>
                <img src={book.cover} alt="Book cover"/>
                <div>
                  <button><Link to={`/detialbook/${book._id}/update`}>Editar libro</Link></button>
                  <button onClick={eliminateBook}>Eliminar libro</button>
                </div>
              </div>
              <div>
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <p><b>Editorial: </b>{book.publisher}</p>
                <p><b>Edición: </b>{book.edition}</p>
                <p>{book.published}</p>
              </div>
          </div>
          <div>
            <button onClick={showNotes}>Notas</button>
            <button onClick={showQuotes}>Citas</button>
            <button onClick={showReferences}>Referencia</button>
            {notes && 
              <div>Notas
                <NewNote bookIdToUse={bookId} setNewNote={setNewNote}></NewNote>
                {allNotes?.map((note, i) => (
                  <div key={i}>
                    <p>{note.description}</p>
                    <button onClick={()=>{eliminateNote(note._id)}}>Eliminar nota</button>
                  </div> 
                ))}
              </div>}
            {quotes && <div>Citas
                <NewQuote bookIdToUse={bookId} setNewQuote={setNewQuote}></NewQuote>
                {allQuotes?.map((quote, i) => (
                  <div key={i}>
                    <p>«{quote.description}»</p>
                    <button onClick={()=>{eliminateQuote(quote._id)}}>Eliminar nota</button>
                  </div> 
                ))}
                </div>}
            {references && <div>Referencias</div>}
          </div>
          </>
        : <Loader></Loader>}
    </div>
  )
}

export default BookDetail

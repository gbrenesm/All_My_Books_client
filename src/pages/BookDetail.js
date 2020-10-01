import React, { useState, useEffect } from 'react'
import Loader from "../components/Loader"
import { getBookDetail } from "../services/books"
import { deleteNote } from "../services/notes"
import { deleteQuote } from "../services/quote"
import NewNote from "../components/NewNote"
import NewQuote from "../components/NewQuote"
import Reference from "../components/Reference"
import BookCardDetail from "../components/BookCardDetail"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileAlt, faBookmark, faQuoteLeft } from "@fortawesome/free-solid-svg-icons"

function BookDetail({ match: { params: { bookId } }}) {
  const [book, setBook] = useState(null)
  const [notes, setNotes] = useState(true)
  const [quotes, setQuotes] = useState(false)
  const [references, setReferences] = useState(false)
  const [allNotes, setAllNotes] = useState(null)
  const [allQuotes, setAllQuotes] = useState(null)
  const [allShelves, setAllShelves] = useState(null)
  const [newNote, setNewNote] = useState(false)
  const [newQuote, setNewQuote] = useState(false)
  const [newShelf, setNewShelf] = useState(false)
  const [updateBook, setUpdateBook] = useState(false)

  async function fetchBook() {
    const detailbook = await getBookDetail(bookId)
    setBook(detailbook.book)
    setAllNotes(detailbook.book.notes)
    setAllQuotes(detailbook.book.quotes)
    setAllShelves(detailbook.book.bookshelves)
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
    setUpdateBook(false)
    setNewShelf(false)
  }, [newNote, newQuote, updateBook, newShelf])

  return (
    <div className="bookdetail">
        {book? 
        <>
          <BookCardDetail book={book} setUpdateBook={setUpdateBook} bookShelves={allShelves} bookId={bookId} setNewShelf={setNewShelf}></BookCardDetail>
          <div className="notesbook">
            <Link onClick={showNotes} style={!notes? {backgroundColor:"#e5e5e5", color:"#343a40"} : {backgroundColor:"rgba(168, 198, 134, 1)"} }><FontAwesomeIcon icon={faBookmark}/>&nbsp;Notas</Link>
            <Link onClick={showQuotes} style={!quotes? {backgroundColor:"#e5e5e5", color:"#343a40"} : {backgroundColor:"rgba(168, 198, 134, 1)"}}><FontAwesomeIcon icon={faQuoteLeft}/>&nbsp;Citas</Link>
            <Link onClick={showReferences} style={!references? {backgroundColor:"#e5e5e5", color:"#343a40"} : {backgroundColor:"rgba(168, 198, 134, 1)"}}><FontAwesomeIcon icon={faFileAlt}/>&nbsp;Referencia</Link>
            {notes && 
              <div className="notescards">
                <NewNote bookIdToUse={bookId} setNewNote={setNewNote}></NewNote>
                {allNotes? allNotes.map((note, i) => (
                  <div className="onenotecard" key={i}>
                    <p>{note.chapter}</p>
                    {note.pages && <p>Página(s): {note.pages}</p>}
                    <p>{note.description}</p>
                    <button onClick={()=>{eliminateNote(note._id)}}>Eliminar nota</button>
                  </div> 
                )) : <p>Agrega tus notas sobre el libro</p>}
              </div>}
            {quotes && 
              <div className="notescards">
                <NewQuote bookIdToUse={bookId} setNewQuote={setNewQuote}></NewQuote>
                {allQuotes?.map((quote, i) => (
                  <div className="onenotecard" key={i}>
                    <p>«{quote.description}»</p>
                    {quote.pages && <p>Página(s): {quote.pages}</p>}
                    {quote.note && <p>Nota: {quote.note}</p>}
                    <button onClick={()=>{eliminateQuote(quote._id)}}>Eliminar nota</button>
                  </div> 
                ))}
                </div>}
            {references && 
              <div className="notescards">Referencias
                <Reference bookData={book}></Reference>
              </div>}
          </div>
          </>
        : <Loader></Loader>}
    </div>
  )
}

export default BookDetail

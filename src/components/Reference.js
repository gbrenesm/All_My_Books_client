import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy } from "@fortawesome/free-solid-svg-icons"


function Reference({ bookData }) {
  const [referenceAPA, setReferenceAPA] = useState(false)
  const [referenceMLA, setReferenceMLA] = useState(false)
  const [referenceChicago, setReferenceChicago] = useState(false)
  const [referenceUNEISO, setReferenceUNEISO] = useState(false)

  function showAPA() {
    setReferenceAPA(true)
    setReferenceMLA(false)
    setReferenceChicago(false)
    setReferenceUNEISO(false)
  }

  function showMLA() {
    setReferenceAPA(false)
    setReferenceMLA(true)
    setReferenceChicago(false)
    setReferenceUNEISO(false)
  }

  function showChicago() {
    setReferenceAPA(false)
    setReferenceMLA(false)
    setReferenceChicago(true)
    setReferenceUNEISO(false)
  }

  function showUNEISO() {
    setReferenceAPA(false)
    setReferenceMLA(false)
    setReferenceChicago(false)
    setReferenceUNEISO(true)
  }


  return (
    <div>
      <p>Selecciona un formato de referencias: </p>
      <div>
        <input type="radio" name="reference" value="apa" onChange={showAPA} />
        <label for="apa">APA</label>
        <input type="radio" name="reference" value="mla" onChange={showMLA} />
        <label for="mla">MLA</label>
        <input type="radio" name="reference" value="chicago" onChange={showChicago} />
        <label for="chicago">Chicago</label>
        <input type="radio" name="reference" value="UNE-ISO 690 " onChange={showUNEISO} />
        <label for="UNE-ISO 690">UNE-ISO 690 </label>
      </div>
      <div className="notes">
        {referenceAPA && <p>{bookData.authorLastName ? bookData.authorLastName : "Apellido"}, {bookData.authorFirstName ? bookData.authorFirstName.charAt(0) : "Iniciales"}.{bookData.coAuthorLastName ? `, y ${bookData.coAuthorLastName}` : ""}{bookData.coAuthorFirstName ? `, ${bookData.coAuthorFirstName.charAt(0)}.` : ""} ({bookData.published ? bookData.published.slice(0, 4) : "Año de publicación"}). <em>{bookData.title}</em>. {bookData.publisher === [] ? "Editorial" : bookData.publisher}</p>}
        {referenceAPA && <button onClick={() =>  navigator.clipboard.writeText(`${bookData.authorLastName ? bookData.authorLastName : "Apellido"}, ${bookData.authorFirstName ? bookData.authorFirstName.charAt(0) : "Iniciales"}.${bookData.coAuthorLastName ? `, y ${bookData.coAuthorLastName}` : ""}${bookData.coAuthorFirstName ? `, ${bookData.coAuthorFirstName.charAt(0)}.` : ""} (${bookData.published ? bookData.published.slice(0, 4) : "Año de publicación"}). ${bookData.title}. ${bookData.publisher === [] ? "Editorial" : bookData.publisher}`)}><FontAwesomeIcon icon={faCopy}/>&nbsp;&nbsp;Copiar referencia</button>}
        
        {referenceMLA && <p>{bookData.authorLastName ? bookData.authorLastName : "Apellido"}, {bookData.authorFirstName ? bookData.authorFirstName : "Nombre"}{bookData.coAuthorLastName ? `, et al`: ""}. <em>{bookData.title}</em>. {bookData.publishPlace ? bookData.publishPlace : "Lugar de publicación"}: {bookData.publisher === [] ? "Editorial" : bookData.publisher}, {bookData.published ? bookData.published.slice(0, 4) : "Año de publicación"}. </p>}
        {referenceMLA && <button onClick={() => navigator.clipboard.writeText(`${bookData.authorLastName ? bookData.authorLastName : "Apellido"}, ${bookData.authorFirstName ? bookData.authorFirstName : "Nombre"}${bookData.coAuthorLastName ? `, et al`: ""}. ${bookData.title}. ${bookData.publishPlace ? bookData.publishPlace : "Lugar de publicación"}: ${bookData.publisher === [] ? "Editorial" : bookData.publisher}, ${bookData.published ? bookData.published.slice(0, 4) : "Año de publicación"}.`)}><FontAwesomeIcon icon={faCopy}/>&nbsp;&nbsp;Copiar referencia</button>}
        
        {referenceChicago && <p>{bookData.authorLastName ? bookData.authorLastName : "Apellido"}, {bookData.authorFirstName ? bookData.authorFirstName : "Nombre"}{bookData.coAuthorFirstName ? `, and ${bookData.coAuthorFirstName}`: ""}{bookData.coAuthorLastName ? `${bookData.coAuthorLastName}`: ""}. <em>{bookData.title}</em>. {bookData.publishPlace ? bookData.publishPlace : "Lugar de publicación"}: {bookData.publisher === [] ? "Editorial" : bookData.publisher}, {bookData.published ? bookData.published.slice(0, 4) : "Año de publicación"}. </p>}
        {referenceChicago && <button onClick={() => navigator.clipboard.writeText(`${bookData.authorLastName ? bookData.authorLastName : "Apellido"}, ${bookData.authorFirstName ? bookData.authorFirstName : "Nombre"}${bookData.coAuthorFirstName ? `, and ${bookData.coAuthorFirstName}`: ""}${bookData.coAuthorLastName ? `${bookData.coAuthorLastName}`: ""}. ${bookData.title}. ${bookData.publishPlace ? bookData.publishPlace : "Lugar de publicación"}: ${bookData.publisher === [] ? "Editorial" : bookData.publisher}, ${bookData.published ? bookData.published.slice(0, 4) : "Año de publicación"}`)}><FontAwesomeIcon icon={faCopy}/>&nbsp;&nbsp;Copiar referencia</button>}
        
        {referenceUNEISO && <p>{bookData.authorLastName ? bookData.authorLastName.toUpperCase() : "Apellido"}, {bookData.authorFirstName ? bookData.authorFirstName : "Nombre"} {bookData.coAuthorLastName ? `y ${bookData.coAuthorLastName}` : ""}{bookData.coAuthorFirstName ? `, ${bookData.coAuthorFirstName.charAt(0)}`: ""}. <em>{bookData.title}.</em> {bookData.publishPlace ? bookData.publishPlace : "Lugar de publicación"}: {bookData.publisher === [] ? "Editorial" : bookData.publisher}, {bookData.published ? bookData.published.slice(0, 4) : "Año de publicación"}. ISBN: {bookData.ISBN ? bookData.ISBN : "ISBN"}</p>}
        {referenceUNEISO && <button onClick={() => navigator.clipboard.writeText(`${bookData.authorLastName ? bookData.authorLastName.toUpperCase() : "Apellido"}, ${bookData.authorFirstName ? bookData.authorFirstName : "Nombre"} ${bookData.coAuthorLastName ? `y ${bookData.coAuthorLastName}` : ""}${bookData.coAuthorFirstName ? `, ${bookData.coAuthorFirstName.charAt(0)}`: ""}. ${bookData.title}. ${bookData.publishPlace ? bookData.publishPlace : "Lugar de publicación"}: ${bookData.publisher === [] ? "Editorial" : bookData.publisher}, ${bookData.published ? bookData.published.slice(0, 4) : "Año de publicación"}. ISBN: ${bookData.ISBN ? bookData.ISBN : "ISBN"}`)}><FontAwesomeIcon icon={faCopy}/>&nbsp;&nbsp;Copiar referencia</button>}
      </div>
    </div>
  )
}

export default Reference

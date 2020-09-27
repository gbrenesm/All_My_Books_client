import React, {useState} from 'react'

function Reference({bookData}) {
  //console.log(bookData)
  const [referenceAPA, setReferenceAPA] = useState(false)
  const [referenceMLA, setReferenceMLA] = useState(false)
  const [referenceChicago, setReferenceChicago] = useState(false)
  const [referenceUNEISO, setReferenceUNEISO] = useState(false)
  
  function showAPA(){
    setReferenceAPA(true)
    setReferenceMLA(false)
    setReferenceChicago(false)
    setReferenceUNEISO(false)
  }

  function showMLA(){
    setReferenceAPA(false)
    setReferenceMLA(true)
    setReferenceChicago(false)
    setReferenceUNEISO(false)
  }

  function showChicago(){
    setReferenceAPA(false)
    setReferenceMLA(false)
    setReferenceChicago(true)
    setReferenceUNEISO(false)
  }

  function showUNEISO(){
    setReferenceAPA(false)
    setReferenceMLA(false)
    setReferenceChicago(false)
    setReferenceUNEISO(true)
  }

  return (
    <div>
      <p>Selecciona un formato de referencias: </p>
      <div>
        <input type="radio" name="reference" value="apa" onChange={showAPA}/>
        <label for="apa">APA</label>
        <input type="radio" name="reference" value="mla" onChange={showMLA}/>
        <label for="mla">MLA</label>
        <input type="radio" name="reference" value="chicago" onChange={showChicago}/>
        <label for="chicago">Chicago</label>
        <input type="radio" name="reference" value="UNE-ISO 690 " onChange={showUNEISO}/>
        <label for="UNE-ISO 690">UNE-ISO 690 </label>
      </div>
      <div>
        {referenceAPA && <p>{bookData.authorLastName}, {bookData.authorFirstName.charAt(0)}. ({bookData.published.slice(0, 4)}). <em>{bookData.title}</em>. {bookData.publisher}</p>}
        {referenceMLA && <p>{bookData.authorLastName}, {bookData.authorFirstName}. <em>{bookData.title}</em>. {bookData.publishPlace}: {bookData.publisher}, {bookData.published.slice(0, 4)}. </p>}
        {referenceChicago && <p>{bookData.authorLastName}, {bookData.authorFirstName}. <em>{bookData.title}</em>. {bookData.publishPlace}: {bookData.publisher}, {bookData.published.slice(0, 4)}. </p>}
  {referenceUNEISO && <p>{bookData.authorLastName.toUpperCase()}, {bookData.authorFirstName}. <em>{bookData.title}</em> {bookData.publishPlace}: {bookData.publisher}, {bookData.published.slice(0, 4)}. ISBN: {bookData.ISBN}</p>}
      </div>
    </div>
  )
}

export default Reference

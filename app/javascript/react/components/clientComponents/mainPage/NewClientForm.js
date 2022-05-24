import React, { useState } from "react"

const NewClientForm = props => {
  const [newClient, setNewClient] = useState({
    salutation: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    ssn: "",
    birth_date: "",
    comment: ""
  })


  const handleInputChange = event => {
    setNewClient({
      ...newClient,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setNewClient({
      salutation: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      ssn: "",
      birth_date: "",
      comment: ""
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await props.addClient(newClient)
    if(success){
      clearForm()
    }
  }

  const clientSubFields = ["salutation", "first_name", "middle_name", "last_name", "ssn", "birth_date", "comment"]
  let labels = clientSubFields.map(subField => {
    return (
      <label htmlFor={subField} key={subField}>

        <input
          key={subField}
          type="text"
          id={subField}
          name={subField}
          onChange={handleInputChange}
          value={newClient[subField]}
          placeholder={subField}
          />
      </label>
    )
  })

  return(
    <div className="add-client-form">
      <form onSubmit = {handleSubmit}>
        {labels}
        <input className="add-submit" type="submit"/>
      </form>
    </div>
  )
}

export default NewClientForm
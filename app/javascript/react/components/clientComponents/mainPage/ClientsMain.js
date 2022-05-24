import React, { useState, useEffect } from "react";
import ClientTile from "./ClientTile.js";
import translateServerErrors from "../../../../../helpers/translateServerErrors.js";
import MenuCloseIcon from "../MenuCloseIcon.js";
import NewClientForm from "./NewClientForm.js";
import ErrorList from "../../../../../helpers/ErrorList.js"

const ClientsMain = (props) => {
  const [clients, setClients] = useState([])
  const [errors, setErrors] = useState([])

  const getClients = async () => {
    try{
      const response = await fetch(`/api/v1/people`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      console.log(body)
      setClients(body)

    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getClients()
}, [props.user])

  const addClient = async (formPayLoad) => {
    formPayLoad.user_id = props.user.id
    try{
      const response = await fetch(`/api/v1/people`, {
        method: 'POST',
        headers: new Headers ({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(formPayLoad),
      })
    if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json()
          console.log(errorBody)
          const newErrors = translateServerErrors(errorBody.error)
          console.log(newErrors)
          setErrors(newErrors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
    } else {
      const formBody = await response.json()
      console.log(formBody)
      setClients([formBody, ...clients])
      setErrors([])
      return true
      }
    } catch(error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const deleteClient = async (clientId) => {
    try {
      const response = await fetch(`/api/v1/people`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(clientId)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          setErrors(newErrors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }
  const editClient = async (formPayLoad) => {
    try {
      const response = await fetch(`/api/v1/people`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formPayLoad)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          setErrors(newErrors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const toggleAdd = () => {
    if (props.user){
      document.getElementById('addClient').classList.toggle('closed')
    } else {
      alert("Sign in to add clients!")
    }
  }


  return (
    <div>
      <button className="add-button button-style" onClick={toggleAdd}>Add Client</button>
      <div className="addClient closed" id="addClient">
          <div className="menu-close" onClick={toggleAdd}>
            {MenuCloseIcon}
          </div>
          <div className="error-form">
            <ErrorList errors={errors}/>
          </div>
          <NewClientForm addClient={addClient}/>
        </div>
      <table>
        <thead>
          <tr>
            <th>Salutation</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>SSN</th>
            <th>Birth Date</th>
            <th>Comment</th>
            <th>Link</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => {
            return (
                <ClientTile
                  key={client.id}
                  deleteClient={deleteClient}
                  editClient={editClient}
                  client={client}
                  />
              )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ClientsMain
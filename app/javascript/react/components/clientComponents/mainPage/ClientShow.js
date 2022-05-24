import React, { useState, useEffect } from "react";
import { withRouter } from "react-router" // <- here

const ClientShow = props => {
  const [clientAddresses, setClientAddresses] = useState([])
  const [clientPhoneNumbers, setClientPhoneNumbers] = useState([])
  const [clientEmails, setClientEmails] = useState([])

  const getAddresses = async () => {
    try{
      const response = await fetch(`/api/v1/addresses/${props.match.params.id}`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      console.log(body)
      setClientAddresses(body)

    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const getEmails = async () => {
    try{
      const response = await fetch(`/api/v1/emails/${props.match.params.id}`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      console.log(body)
      setClientEmails(body)

    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const getPhoneNumbers = async () => {
    try{
      const response = await fetch(`/api/v1/phones/${props.match.params.id}`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      console.log(body)
      setClientPhoneNumbers(body)

    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getAddresses(),
    getEmails(),
    getPhoneNumbers()
}, [props.user])


  return (
    <div className="client-data">

    </div>
  )
}

export default withRouter(ClientShow)
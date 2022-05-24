import React, { useState, useEffect } from "react";
import ClientTile from "./ClientTile.js";

const ClientsMain = (props) => {
  const [clients, setClients] = useState([])

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


  const clientTiles = clients.map(client => {
    return (<ClientTile
      key={client.id}
      client={client}/>)
  })


  return (<ul className="clients-list">
    <div>
      {clientTiles}
    </div>
  </ul>)
}

export default ClientsMain
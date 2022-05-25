import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const ClientTile = props => {
  const { id, salutation, first_name, middle_name, last_name, ssn, birth_date, comment } = props.client

  const handleDeleteClick = () => {
    props.deleteClient(id)
  }

  const toggleEditMenu = () => {
    if (props.user){
      document.getElementById('addClient').classList.toggle(`closed`)
      document.getElementById('addClient').classList.toggle(`edit`)
      document.getElementById('addClient').classList.toggle(`${id}`)
    } else {
      alert("Sign in to edit clients!")
    }
  }

  return(
    <tr>
      <td>{salutation}</td>
      <td>{first_name}</td>
      <td>{middle_name && <>{middle_name}</>}</td>
      <td>{last_name}</td>
    </tr>
  )
}

export default ClientTile
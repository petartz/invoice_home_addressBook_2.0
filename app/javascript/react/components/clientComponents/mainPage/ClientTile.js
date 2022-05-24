import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import NewClientForm from "./NewClientForm.js";

const ClientTile = props => {
  const { id, salutation, first_name, middle_name, last_name, ssn, birth_date, comment } = props.client

  const handleDeleteClick = () => {
    props.deleteClient(id)
  }

  const handleEditClick = () => {

  }

  const toggleEditMenu = () => {

  }

  return(
    <tr>
      <td>{salutation}</td>
      <td>{first_name}</td>
      <td>{middle_name && <>{middle_name}</>}</td>
      <td>{last_name}</td>
      <td>{ssn && <>{ssn}</>}</td>
      <td>{birth_date && <>{birth_date}</>}</td>
      <td>{comment && <>{comment}</>}</td>
      <td><Link to={`/people/${id}`}>Show Client</Link></td>
      <td><button className="button-style" onClick={handleDeleteClick}>Delete</button></td>
      <td><button className="button-style" onClick={toggleEditMenu}>Edit</button></td>
    </tr>
  )
}

export default ClientTile
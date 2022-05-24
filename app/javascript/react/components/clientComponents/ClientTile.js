import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const ClientTile = props => {
  const { id, first_name, middle_name, last_name, ssn, birth_date, comment } = props.client
  return(
    <Link to={`/people/${id}`}>
      <p>First Name: {first_name}</p>
      <p>Middle Name: {middle_name && <>{middle_name}</>}</p>
      <p>Last Name: {last_name}</p>
      <p>SSN: {ssn && <>{ssn}</>}</p>
      <p>Birth Date: {birth_date && <>{birth_date}</>}</p>
      <p>Comment: {comment && <>{comment}</>}</p>
    </Link>
  )
}

export default ClientTile
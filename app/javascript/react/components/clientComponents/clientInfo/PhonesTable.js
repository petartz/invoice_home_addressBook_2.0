import React, { useState, useEffect } from "react";

const PhonesTable = props => {

  return (
    <table>
      <thead>
        <tr>
          <th>Street</th>
          <th>Town</th>
          <th>Zip Code</th>
          <th>State</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => {
          return (
              <ClientTile
                key={client.id}
                user={props.user}
                deleteClient={deleteClient}
                editClient={editClient}
                client={client}
                />
            )
        })}
      </tbody>
    </table>
  )
}

export default PhonesTable
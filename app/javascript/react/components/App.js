import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import getCurrentUser from "../../../helpers/getCurrentUser.js";
import ClientsMain from "./clientComponents/mainPage/ClientsMain.js";
import ClientShow from "./clientComponents/mainPage/ClientShow.js";

export const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(undefined)
    }
  }
  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ClientsMain user={currentUser}/>
        </Route>
        <Route exact path="/people/:id">
          <ClientShow user={currentUser}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App

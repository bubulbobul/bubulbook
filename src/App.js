import React, { Fragment, useEffect, useState } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import firebase from "firebase"
import { connect } from "react-redux"
import 'semantic-ui-css/semantic.min.css'

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import { loadUserAct, clearUser } from "./actions/userAct"

import Spinner from "./utils/Spinner"
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import Dashboard from "./components/Dashboard"

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App({ history, loadUserAct, isLoading, clearUser }) {
  const [loggedIn, setLoggedIn] = useState({
    userLoggedIn: false
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user)
        loadUserAct(user, history)
        setLoggedIn({ userLoggedIn: true })
      } else {
        setLoggedIn({ userLoggedIn: false })
        history.push('/');
        clearUser();
      }
    })
  }, [])

  return isLoading ? <Spinner /> : (
    <Fragment>
      <AlertProvider template={AlertTemplate} {...options}>
        <Navbar userLoggedIn={loggedIn.userLoggedIn} />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </AlertProvider>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
})

export default withRouter(connect(mapStateToProps, { loadUserAct, clearUser })(App));

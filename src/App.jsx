import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth } from './api/config';
import LandingPage from './containers/LandingPage/LandingPage';
import Verify from './containers/Verify/Verify';
import MenuPage from './containers/MenuPage/MenuPage';
import QRPage from './containers/QRPage/QRPage';
import Login from './containers/Login/Login';
import Dashboard from './layouts/Dashboard';
import Settings from './containers/Settings/Settings';

function App() {
  const [authenticated, setAuthenticated] = useState(null)
  let routes;
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    });
  }, [])

  if (authenticated) {
    routes = (
      <Dashboard>
        <Switch>
          <Route exact path="/menus" component={MenuPage} />
          <Route exact path="/my-qrcode" component={QRPage} />
          <Route exact path="/settings" component={Settings} />
          <Redirect to="/menus" />
        </Switch>
      </Dashboard>
    )
  } else if (authenticated === false) {
    routes = (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;

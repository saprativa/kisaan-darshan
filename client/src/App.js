import React from 'react'
import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';
import PrivateRoute from './hocs/PrivateRoute'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'


function App() {
  return (
    <div className="container">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login}  exact />
        <Route path="/register" component={Register} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
        <PrivateRoute path="/profile" component={Profile} exact />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;

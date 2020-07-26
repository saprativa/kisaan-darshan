import React from 'react';
import './App.css';
import MyNavbar from './components/MyNavbar';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
      <MyNavbar></MyNavbar>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import MyNavbar from './components/MyNavbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Secret from './components/Secret';
import Error from './components/Error';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('token') !== null
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login}  exact />
        <Route path="/register" component={Register} exact />
        <PrivateRoute path="/secret" component={Secret} exact />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;

import React, { useState, useContext } from 'react'
import {AuthContext} from '../context/AuthContext'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { NavLink } from 'react-router-dom'
import {
  Collapse,
  Navbar as ReactstrapNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Button
} from 'reactstrap'


const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory()

  const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext)

  const toggle = () => setIsOpen(!isOpen);

  const unAuthenticatedNavbar = ()=> {
    return (
      <>
        <Nav className="navbar-nav ml-auto" navbar>
          <NavItem>
            <NavLink to="/register" className="nav-link">Register</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login" className="nav-link">Login</NavLink>
          </NavItem>
        </Nav>
      </>
    )
  }

  const authenticatedNavbar = ()=> {
    return (
      <>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile" className="nav-link">Profile</NavLink>
          </NavItem>
        </Nav>
        <Nav className="navbar-nav ml-auto" navbar>
          <NavbarText>Welcome {user} &nbsp;</NavbarText>
          <Button color="secondary" onClick={logoutHandler}>Logout</Button>
        </Nav>
      </>
    )
  }


  const logoutHandler = () => {
    axios.get('/api/logout')
    .then((response) => {
      if (response.data.success) {
        setIsAuthenticated(false)
        setUser(null)
        history.push("/login")
      } 
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return (
    <div>
      <ReactstrapNavbar color="light" light expand="md">
        <NavbarBrand href="/">Kisaan Darshan</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          
            {isAuthenticated? authenticatedNavbar() : unAuthenticatedNavbar()}
          
        </Collapse>
      </ReactstrapNavbar>
    </div>
  );
}

export default Navbar;
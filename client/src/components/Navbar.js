import React, { useState, useContext } from 'react';
import {AuthContext} from '../context/AuthContext'
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar as ReactstrapNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap';


const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {isAuthenticated, user} = useContext(AuthContext)

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
            <NavLink to="/secret" className="nav-link">Secret</NavLink>
          </NavItem>
        </Nav>
        <NavbarText>Welcome {user}</NavbarText>
      </>
    )
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
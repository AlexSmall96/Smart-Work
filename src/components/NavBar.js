import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink className={styles.NavLink} to="/">
            <Navbar.Brand href="#home">
                Smart <i class="fa-solid fa-glasses"></i> Work
            </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink className={styles.NavLink} activeClassName={styles.Active} exact to="/">Home</NavLink>
              <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">Sign In</NavLink>
              <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">Sign Up</NavLink>
            </Nav>
        </Navbar.Collapse>
      </Container>
   </Navbar>
    )
}

export default NavBar
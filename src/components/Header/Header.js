import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  <Fragment>
    <Nav className="container nav-links m-auto" variant="dark">
      <Nav.Link className="nav-link" href="#home-page">Home</Nav.Link>
      <Nav.Link className="nav-link" href="#all-images">View All Images</Nav.Link>
      <Nav.Link className="nav-link" href="#all-blogs">View All Blogs</Nav.Link>
      <Nav.Link className="nav-link" href="#my-images">View My Images</Nav.Link>
      <Nav.Link className="nav-link" href="#my-blogs">View My Blogs</Nav.Link>
      <Nav.Link className="nav-link" href="#post-image">Create Image</Nav.Link>
      <Nav.Link className="nav-link" href="#create-blog">Create Blog</Nav.Link>
      <Nav.Link className="nav-link" href="#cart">Cart</Nav.Link>
      <NavDropdown className="dropdown" alignRight title="Account" id="basic-nav-dropdown">
        {/* <NavDropdown.Item href="#text-editor">Text Editor</NavDropdown.Item> */}
        {/* <NavDropdown.Divider /> */}
        <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
        <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav className="ml-auto">
      <Nav.Link href="#sign-up">Sign Up</Nav.Link>
      <Nav.Link href="#sign-in">Sign In</Nav.Link>
    </Nav>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#/">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar className="nav-bar" variant="dark" expand="lg" sticky="top">
    <Navbar.Brand href="#home-page">
      <img src="https://user-images.githubusercontent.com/64027495/107455102-36592400-6b1c-11eb-8c10-4c1cfc0d575b.png"/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="container">
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header

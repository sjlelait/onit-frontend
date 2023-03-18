import { Link } from 'react-router-dom';
import { login, logout } from '../firebase';
import { useState } from 'react';  

// bootstrap nav
import { Navbar, Nav } from 'react-bootstrap';

function Header(props) {
  // state to toggle menu off
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    setExpanded(false);
  }

  return (
    <Navbar expanded={expanded} onToggle={setExpanded} expand="false" bg="success" variant="dark">
      <Navbar.Brand as={Link} to="/">Onit Home</Navbar.Brand>
      { props.user ?
        <>
        <span className="navbar-text">
          <h5>Welcome, {props.user.displayName}
            <img 
              src={props.user.photoURL} 
              alt={props.user.displayName} 
            />
          </h5>
        </span>                
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" onClick={handleLinkClick}>
          <Nav.Link as={Link} to="/tasks/important">Important Tasks</Nav.Link>
          <Nav.Link as={Link} to="/tasks/new">New Task</Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>  
        </Nav>        
      </Navbar.Collapse>
        </>
        :
      <Nav.Link onClick={login}>Login</Nav.Link>
      }
    </Navbar>
      )}

export default Header;
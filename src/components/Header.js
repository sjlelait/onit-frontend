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
  };

  return (
    <Navbar
      className='navbar'
      expanded={expanded}
      onToggle={setExpanded}
      expand='false'
    >
      <Navbar.Brand as={Link} to='/' className='navbar-brand-link'>
        Onit
      </Navbar.Brand>
      {props.user ? (
        <>
          <div className='user-info'>
            <p className='mb-0'>Welcome, {props.user.displayName}</p>
          </div>
          <div className='user-image-container'>
            <img
              src={props.user.photoURL}
              alt={props.user.displayName}
              className='ml-3 user-image'
            />
          </div>
          <Navbar.Toggle
            className='hamburger'
            aria-controls='basic-navbar-nav'
          />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto hamburger-menu' onClick={handleLinkClick}>
              <Nav.Link as={Link} to='/tasks/important'>
                Important Tasks
              </Nav.Link>
              <Nav.Link as={Link} to='/tasks/new'>
                New Task
              </Nav.Link>
              <Nav.Link onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : (
        <Nav.Link className='navbar-brand-link' onClick={login}>Login</Nav.Link>
      )}
    </Navbar>
  );
}

export default Header;

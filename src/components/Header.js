import { login, logout } from '../firebase';
import { Link } from 'react-router-dom';

// bootstrap nav
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
  return (
    <Navbar collapseOnSelect expand="false" bg="success" variant="dark">
      <Navbar.Brand href="/">Onit Home</Navbar.Brand>
      { props.user ?
        <>
        <span class="navbar-text">
          <h5>Welcome, {props.user.displayName}
            <img 
              src={props.user.photoURL} 
              alt={props.user.displayName} 
            />
          </h5>
        </span>                
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
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
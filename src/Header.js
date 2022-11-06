import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import AuthButtons from './AuthButtons';

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='header'>
          <Navbar.Brand className='headerTitle'>My Favorite Books</Navbar.Brand>
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          {/* PLACEHOLDER: render a navigation link to the about page */}
          <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
          {this.props.auth0.isAuthenticated &&
            <NavItem><Link to="/profile" className="nav-link">profile</Link></NavItem>
          }
          <AuthButtons />
        </Navbar>
      </>
    )
  }
}

export default withAuth0(Header);

import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import API from '../API';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link ,useLocation} from 'react-router-dom';
import { RouteFilters } from './Filters';
const Navigation = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  const location = useLocation(); // Retrieve the current location using useLocation()
  const activeFilter = location.pathname.split('/').pop(); // Extract the last segment of the pathname as the active filter

  return (
    <Navbar bg="primary" fixed="top" className="navbar-padding">
      <Link style={{textDecoration: 'none'}} to="/">
        <Navbar.Brand>
           Quit Quill
        </Navbar.Brand>
      </Link>
     
      <RouteFilters items={props.filters} filterLabel={activeFilter}/>
    </Navbar>
  );
}

export { Navigation }; 
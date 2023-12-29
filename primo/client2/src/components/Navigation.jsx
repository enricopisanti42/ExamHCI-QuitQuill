import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import API from '../API';
import { Navbar, Nav, Col, Row, Container} from 'react-bootstrap';
import { Link ,useLocation} from 'react-router-dom';
import { RouteFilters } from './Filters';
const Navigation = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  const location = useLocation(); // Retrieve the current location using useLocation()
  const activeFilter = location.pathname.split('/').pop(); // Extract the last segment of the pathname as the active filter

  return (
    <Navbar fixed="top" className="navbar-padding">
      <Container fluid>
      
          <Col xs={12} sm={4}>
            <Link style={{textDecoration: 'none'}} to="/">
              <Navbar.Brand className='logo'>
                Quit Quill
              </Navbar.Brand>
            </Link>
          </Col>
          <Col xs={12} sm={8}>
            <RouteFilters items={props.filters} filterLabel={activeFilter}/>
          </Col>
      
      </Container>
    </Navbar>
  );
}

export { Navigation }; 
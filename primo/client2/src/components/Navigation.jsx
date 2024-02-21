import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import API from '../API';
import { Navbar, Nav, Col, Row, Container, Modal, Button} from 'react-bootstrap';
import { Link ,useLocation} from 'react-router-dom';
import { RouteFilters } from './Filters';
const Navigation = (props) => {

  const [showInitialModal, setShowInitialModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialModal(true);
    }, 10000); // Mostro il modal dopo 5 secondi

    return () => clearTimeout(timer); // Pulisco il timer quando il componente si smonta
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleClose = async () => {
    await API.updateMilestone();
    setShowInitialModal(false);
  }

  const location = useLocation(); // Retrieve the current location using useLocation()
  const activeFilter = location.pathname.split('/').pop(); // Extract the last segment of the pathname as the active filter

  return (
    <>
    <Navbar fixed="top" className="navbar-padding">
      <Container fluid>
      
          <Col xs={12} sm={4}>
            <Link style={{textDecoration: 'none'}} to="/home">
              <Navbar.Brand className='logo'>
                Quit Quill
              </Navbar.Brand>
            </Link>
          </Col>
          <Col xs={12} sm={8}>
            <RouteFilters items={props.filters} filterLabel={activeFilter}/>
          </Col>
      
      </Container>
      <Navbar.Brand className='navbar-user'>
                Hello David! 

              </Navbar.Brand>
              <i className="bi bi-person-circle navbar-user"></i>
    </Navbar>
    <Modal show={showInitialModal} onHide={() => setShowInitialModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have unlocked the achievement: "Reduced stress levels"</p>
          <p>You can share it in the community by going in the Milestones section!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { Navigation }; 
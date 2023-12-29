import React ,{useEffect,useState}from 'react';
import { Row, Col, Button,Toast, Spinner,Container} from 'react-bootstrap';
import { useNavigate, Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { Homelayout } from './Homepage';
import { FakeChat } from './Chat';


import API from '../API';
function DefaultLayout(props) {

  return (
    <Row className="below-nav">
        <Col sm={4}>
          <FakeChat/>
        </Col>
        <Col sm={8}>
        <Outlet/>
        </Col>


    </Row>
  );
}

function MainLayout(props) {


  let { filterLabel } = useParams();



  switch (filterLabel) {
    case 'home':
      return (
        <>
          <Homelayout/>
        </>
      );
      break;
    case 'calendar':
      return (
        <>
        <h1 className="pb-4" >qui mettiamo un componente per il calendario</h1>
        </>
      );
      break;
    case 'milestones':
      return (
        <>
        <h1 className="pb-4" >qui mettiamo un componente per le milestones</h1>
        </>
      );
      break;
      case 'askexperts':
      return (
        <>
        <h1 className="pb-4" >qui mettiamo un componente per gli esperti</h1>
        </>
      );
      break;
    default:
      return (
        <>
        <h1 className="pb-4" >not found</h1>
        </>
      );
      break;

}

}

function ExpertsLayout(props) {
 


  
  
    return (
      
      <>
        <h1 className="pb-3">qui facciamo la selezione degli esperti:</h1>

      </>
    );

  }







function LoginLayout(props) {
  return (
    <>
      <LoginForm login={props.login} />
    </>
  );
}

function NotFoundLayout() {
    return(
        <>
          <h2>This is not the route you are looking for!</h2>
          <Link to="/">
            <Button variant="primary">Go Home!</Button>
          </Link>
        </>
    );
  }


export { DefaultLayout, ExpertsLayout, NotFoundLayout, MainLayout, LoginLayout }; 

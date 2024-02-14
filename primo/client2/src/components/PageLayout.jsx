import React, { useEffect, useState ,useRef} from "react";
import { Row, Col, Button, Toast, Spinner, Container } from "react-bootstrap";
import {
  useNavigate,
  Link,
  useParams,
  useLocation,
  Outlet,
} from "react-router-dom";
import { Homelayout } from "./Homepage";
import { FakeChat } from "./Chat";
import { Calendar } from "./Calendar";
import { ChatApp} from "./Expter";
import { Milestone } from "./Milestone";

import API from "../API";
function DefaultLayout(props) {
  const { filterLabel } = useParams();
  const [prevFilterLabel, setPrevFilterLabel] = useState('');
  const [currentFilterLabel, setCurrentFilterLabel] = useState('');
  const [delayedRender, setDelayedRender] = useState(false); // Stato per controllare il ritardo nella renderizzazione

  useEffect(() => {
    setPrevFilterLabel(currentFilterLabel); // Salva il valore precedente di filterLabel
    setCurrentFilterLabel(filterLabel);
  }, [filterLabel]);

  const [slideDirection, setSlideDirection] = useState('');

  useEffect(() => {
    if (currentFilterLabel === 'askexperts') {
      // Ritarda la renderizzazione dell'elemento Row di ChatApp di 1000 ms (1 secondo) quando filterLabel diventa 'askexperts'
      const timeout = setTimeout(() => {
        setDelayedRender(true);
      }, 275);
      return () => clearTimeout(timeout);
    } else {
      setDelayedRender(false);
    }
  }, [currentFilterLabel]);

  useEffect(() => {
    if (currentFilterLabel === 'askexperts') {
      setSlideDirection('slide-out-left');
    } else {
      setSlideDirection('slide-in-right');
    }
  }, [currentFilterLabel]);

  console.log(currentFilterLabel, prevFilterLabel);

  let componentToRender;

  switch (prevFilterLabel) { // Utilizza il valore precedente di filterLabel per renderizzare il componente corretto
    case "home":
      componentToRender = <Homelayout />;
      break;
    case "calendar":
      componentToRender = <Calendar />;
      break;
    case "milestones":
      componentToRender = <h1 className="pb-4">qui mettiamo un componente per le milestones</h1>;
      break;
    default:
      break;
  }

  return (
    <>
    {/* Renderizza l'elemento Row di ChatApp solo quando delayedRender è true */}
    {delayedRender && filterLabel === "askexperts" && (
      <Row className="below-nav chatapp-visible">
        <ChatApp />
      </Row>
    )}
    <Row className="below-nav">
      <Col sm={4} className={`FakeChat ${slideDirection}`}>
        <FakeChat />
      </Col>
      {filterLabel === 'askexperts' ? (
        <Col
          sm={8}
          className={`Outlet ${
            slideDirection === 'slide-in-right' ? 'slide-in-left' : 'slide-out-right'
          }`}
        >
          {componentToRender}
        </Col>
      ) : (
        <Col
          sm={8}
          className={`Outlet ${
            slideDirection === 'slide-in-right' ? 'slide-in-left' : 'slide-out-right'
          }`}
        >
          <Outlet />
        </Col>
      )}
    </Row>
    </>
  );
}





function MainLayout(props) {
  let { filterLabel } = useParams();
  filterLabel = filterLabel || "home";

  switch (filterLabel) {
    case "home":
      return (
        <>
          <Homelayout />
        </>
      );
      break;
    case "calendar":
      return <Calendar />;
      break;
    case "milestones":
      return (
        <>
          <Milestone />
        </>
      );
      break;
    default:
      return (
        <>
          <h1 className="pb-4">
            <>
              <h2>This is not the route you are looking for!</h2>
              <Link to="/">
                <Button variant="primary">Go Home!</Button>
              </Link>
            </>
          </h1>
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



export { DefaultLayout, ExpertsLayout, MainLayout};

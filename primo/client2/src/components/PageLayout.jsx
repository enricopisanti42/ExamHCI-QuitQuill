import React, { useEffect, useState } from "react";
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

import API from "../API";
function DefaultLayout(props) {
  let { filterLabel } = useParams();

  return (
    <Row className="below-nav">
      {filterLabel !== 'askexperts' && (
        <Col sm={4}>
          <FakeChat />
        </Col>
      )}
      <Col sm={filterLabel === 'askexperts' ? 12 : 8}>
        <Outlet />
      </Col>
    </Row>
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
          <h1 className="pb-4">qui mettiamo un componente per le milestones</h1>
        </>
      );
      break;
    case "askexperts":
      return (
        <>
          <ChatApp/>
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

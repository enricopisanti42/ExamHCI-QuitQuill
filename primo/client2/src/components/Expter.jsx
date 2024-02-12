import React, { useState } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';

const ChatApp = () => {
  const [selectedDoctorType, setSelectedDoctorType] = useState(null);
  const [showPreviousChats, setShowPreviousChats] = useState(true);
  const [isNewChatStarted, setIsNewChatStarted] = useState(false);
  const[mostratutto,setmostratutto]=useState(true);

  const doctors = [
    { id: 1, type: "Pediatra", name: "Dr. Rossi" },
    { id: 2, type: "Pediatra", name: "Dr. Bianchi" },
    { id: 3, type: "Dermatologo", name: "Dr. Verdi" },
    { id: 4, type: "Dermatologo", name: "Dr. Neri" },
    { id: 5, type: "Cardiologo", name: "Dr. Gialli" },
    { id: 6, type: "Cardiologo", name: "Dr. Arancioni" },
  ];

  const handleDoctorClick = (doctorType) => {
    setSelectedDoctorType(doctorType);
     // Assicura che la visualizzazione delle chat passate venga mostrata se si seleziona un medico
  };

  const handleTornaIndietro = (doctorType) => {
    setShowPreviousChats(true);
    setIsNewChatStarted(false);
    setmostratutto(true);
     // Assicura che la visualizzazione delle chat passate venga mostrata se si seleziona un medico
  };
  const handleNewChat = (doctorId) => {
    console.log("Inizia una nuova chat con il medico:", doctorId);

    // Qui puoi gestire l'avvio di una nuova chat con il medico selezionato
    setIsNewChatStarted(true);
    setShowPreviousChats(false);
    setmostratutto(false);
    setSelectedDoctorType(null);
  };

  const filteredDoctors = selectedDoctorType
    ? doctors.filter((doctor) => doctor.type === selectedDoctorType)
    : [];

  return (
    <Container>
        <Row className="mt-3">
        {isNewChatStarted && (
            <Col>
              <Button variant="outline-primary" onClick={() => {handleTornaIndietro()}}>Torna indietro</Button>
            </Col>
        )}
          </Row>
      <Row className="mt-3">
        <Col className="text-center">
          {!isNewChatStarted && (
            <Button
              variant="outline-primary"
              onClick={() => {setShowPreviousChats(false);setIsNewChatStarted(true);}}
            >
              Avvia una nuova chat
            </Button>
          )}
        </Col>
      </Row>

      {showPreviousChats && (
        <>
          <Row className="mt-3">
            <Col>
              <h2>Chat Passate</h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <ListGroup>
                {/* Aggiungi qui la logica per visualizzare le chat passate */}
                <ListGroup.Item>Chat passata 1</ListGroup.Item>
                <ListGroup.Item>Chat passata 2</ListGroup.Item>
                <ListGroup.Item>Chat passata 3</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}

      {!showPreviousChats && isNewChatStarted && mostratutto && (
        <>
          <Row className="mt-3">
            <Col>
              <h2>Scegli il tipo di medico</h2>
            </Col>
          </Row>
          <Row className="mt-3">
            {doctors.map((doctor, index) => (
              <Col key={index} className="text-center mb-3">
                <Button variant="primary" onClick={() => handleDoctorClick(doctor.type)}>{doctor.type}</Button>
              </Col>
            ))}
          </Row>
        </>
      )}

      {selectedDoctorType && !showPreviousChats && isNewChatStarted &&(
        <Row className="mt-3">
          <Col>
            <h3>Medici di {selectedDoctorType}</h3>
            <ListGroup>
              {filteredDoctors.map((doctor) => (
                <ListGroup.Item key={doctor.id}>
                  {doctor.name}
                  <Button variant="success" onClick={() => handleNewChat(doctor.id)} className="float-end">Inizia chat</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}

    </Container>
  );
};

export {ChatApp};



import React, { useState } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const ChatApp = () => {
  const [selectedDoctorType, setSelectedDoctorType] = useState(null);
  const [showPreviousChats, setShowPreviousChats] = useState(true);
  const [isNewChatStarted, setIsNewChatStarted] = useState(false);
  const [mostratutto, setmostratutto] = useState(true);
  const [fakechatpartita, setFakechatpartita] = useState(false);

  const doctorsType = [
    { id: 2, type: "Pneumologist" },
    { id: 3, type: "Cardiologist" },
    { id: 5, type: "Psychologist" },
  ];
  const [messaggigiusti, setmessaggigiusti] = useState([]);

  const chatpassate = [
    {
      id: 3,
      firstName: "Michael",
      lastName: "Williams",
      experienceYears: 8,
      specialization: "Cardiologist",
    },
    {
      id: 8,
      firstName: "William",
      lastName: "Wilson",
      experienceYears: 14,
      specialization: "Psychologist",
    },
  ];

  const doctors = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      experienceYears: 10,
      specialization: "Psychologist",
    },
    {
      id: 2,
      firstName: "Emma",
      lastName: "Johnson",
      experienceYears: 15,
      specialization: "Psychologist",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Williams",
      experienceYears: 8,
      specialization: "Cardiologist",
    },
    {
      id: 4,
      firstName: "Sophia",
      lastName: "Brown",
      experienceYears: 12,
      specialization: "Cardiologist",
    },
    {
      id: 5,
      firstName: "Olivia",
      lastName: "Jones",
      experienceYears: 20,
      specialization: "Cardiologist",
    },
    {
      id: 6,
      firstName: "James",
      lastName: "Davis",
      experienceYears: 18,
      specialization: "Cardiologist",
    },
    {
      id: 7,
      firstName: "Isabella",
      lastName: "Miller",
      experienceYears: 9,
      specialization: "Psychologist",
    },
    {
      id: 8,
      firstName: "William",
      lastName: "Wilson",
      experienceYears: 14,
      specialization: "Psychologist",
    },
    {
      id: 9,
      firstName: "Ava",
      lastName: "Moore",
      experienceYears: 11,
      specialization: "Pneumologist",
    },
    {
      id: 10,
      firstName: "Ethan",
      lastName: "Taylor",
      experienceYears: 16,
      specialization: "Pneumologist",
    },
    {
      id: 11,
      firstName: "Mia",
      lastName: "Martinez",
      experienceYears: 13,
      specialization: "Pneumologist",
    },
    {
      id: 12,
      firstName: "Alexander",
      lastName: "Anderson",
      experienceYears: 17,
      specialization: "Pneumologist",
    },
    {
      id: 13,
      firstName: "Charlotte",
      lastName: "Wilson",
      experienceYears: 10,
      specialization: "Cardiologist",
    },
    {
      id: 14,
      firstName: "Daniel",
      lastName: "Thompson",
      experienceYears: 15,
      specialization: "Cardiologist",
    },
    {
      id: 15,
      firstName: "Emily",
      lastName: "White",
      experienceYears: 8,
      specialization: "Psychologist",
    },
    {
      id: 16,
      firstName: "Jack",
      lastName: "Harris",
      experienceYears: 12,
      specialization: "Psychologist",
    },
    {
      id: 17,
      firstName: "Abigail",
      lastName: "Martin",
      experienceYears: 20,
      specialization: "Pneumologist",
    },
    {
      id: 18,
      firstName: "William",
      lastName: "Lee",
      experienceYears: 18,
      specialization: "Pneumologist",
    },
    // Add more doctors as needed
  ];

  const messagesHeartIssue = [
    {
      sender: "User",
      text: "Hello, doctor. I've been feeling some discomfort in my chest lately.",
    },
    {
      sender: "Doctor",
      text: "Hi there. I'm sorry to hear that. Can you describe the discomfort?",
    },
    {
      sender: "User",
      text: "It feels like a pressure or tightness in my chest, and sometimes it radiates to my left arm.",
    },
    {
      sender: "Doctor",
      text: "That sounds concerning. Have you experienced any shortness of breath or nausea along with it?",
    },
    {
      sender: "User",
      text: "Yes, I've noticed some shortness of breath, especially when I exert myself.",
    },
    {
      sender: "Doctor",
      text: "Okay. Given your symptoms, it's important to rule out any cardiac issues. I'd recommend coming in for an evaluation.",
    },
    {
      sender: "User",
      text: "Understood. Should I be worried about a heart attack?",
    },
    {
      sender: "Doctor",
      text: "While I can't diagnose without an examination, your symptoms are concerning. It's better to err on the side of caution.",
    },
    {
      sender: "User",
      text: "Thank you, doctor. I'll schedule an appointment right away.",
    },
    {
      sender: "Doctor",
      text: "You're welcome. Take care, and I'll see you soon.",
    },
  ];

  const handleDoctorClick = (doctorType) => {
    setSelectedDoctorType(doctorType);
    // Assicura che la visualizzazione delle chat passate venga mostrata se si seleziona un medico
  };

  const handleTornaIndietro = () => {
    setShowPreviousChats(true);
    setIsNewChatStarted(false);
    setmostratutto(true);
    setFakechatpartita(false);
    // Assicura che la visualizzazione delle chat passate venga mostrata se si seleziona un medico
  };
  const handleNewChat = (doctorId) => {
    console.log(doctorId);
    doctorId == 3
      ? setmessaggigiusti(messagesHeartIssue)
      : setmessaggigiusti([]);
    console.log(messaggigiusti);
    // Qui puoi gestire l'avvio di una nuova chat con il medico selezionato
    setIsNewChatStarted(true);
    setShowPreviousChats(false);
    setmostratutto(false);
    setFakechatpartita(true);
    setSelectedDoctorType(null);
  };

  const filteredDoctors = selectedDoctorType
    ? doctors.filter((doctor) => doctor.specialization === selectedDoctorType)
    : [];

  return (
    <Container>
      <Row className="mt-3">
        {isNewChatStarted && (
          <Col>
            <Button
              variant="outline-primary"
              onClick={() => {
                handleTornaIndietro();
              }}
            >
              Torna indietro
            </Button>
          </Col>
        )}
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          {!isNewChatStarted && (
            <Button
              variant="outline-primary"
              onClick={() => {
                setShowPreviousChats(false);
                setIsNewChatStarted(true);
              }}
            >
              Avvia una nuova chat
            </Button>
          )}
        </Col>
      </Row>

      {showPreviousChats && (
        <>
          <Row className="mt-3 text-center">
            <Col>
              <h2>Chat Passate</h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={8} className="mx-auto">
              <ListGroup>
                {chatpassate.map((doctor) => (
                  <ListGroup.Item key={doctor.id}>
                    {doctor.firstName} {doctor.lastName}
                    <Button
                      variant="success"
                      onClick={() => handleNewChat(doctor.id)}
                      className="float-end"
                    >
                      riprendi chat
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}

      {!showPreviousChats && isNewChatStarted && mostratutto && (
        <>
          <Row className="mt-3 text-center">
            <Col>
              <h2>Scegli il tipo di medico</h2>
            </Col>
          </Row>
          <Row className="mt-3">
            {doctorsType.map((doctor, index) => (
              <Col key={index} className="text-center mb-3">
                <Button
                  variant="primary"
                  onClick={() => handleDoctorClick(doctor.type)}
                >
                  {doctor.type}
                </Button>
              </Col>
            ))}
          </Row>
        </>
      )}

      {selectedDoctorType && !showPreviousChats && isNewChatStarted && (
        <Row className="mt-3">
          <Col>
            <h3>Medici di {selectedDoctorType}</h3>
            <ListGroup>
              {filteredDoctors.map((doctor) => (
                <ListGroup.Item key={doctor.id}>
                  Name:{doctor.firstName}
                  <Link to="/chatexpert">
                    <Button variant="success" className="float-end">
                      Inizia chat
                    </Button>
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}

      {fakechatpartita && <ChatComponent messages={messaggigiusti} />}
    </Container>
  );
};

const ChatComponent = (props) => {
  const [messages, setMessages] = useState(props.messages);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== "") {
      const updatedMessages = [
        ...messages,
        { sender: "User", text: newMessage },
      ];
      setMessages(updatedMessages);
      setNewMessage("");
    }
  };

  return (
    <div>
      {" "}
      {/* Applica la classe container-chat dal CSS fornito */}
      <div className="message-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={` ${message.sender === "User" ? "user-message" : ""}`}
          >
            <div className="message-box">
              <div className="sender-info">
                <i className="icon bi bi-person-fill"></i>
                {message.sender}
              </div>
              <div className="message-text">{message.text}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="form-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input-box"
          placeholder="Scrivi un messaggio..."
        />
        <button type="submit" className="send-button">
          <i className="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  );
};

export { ChatApp };

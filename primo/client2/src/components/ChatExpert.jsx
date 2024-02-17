import React, { useState } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Chatexpert = () => {
    const [messages, setMessages] = useState([{ sender: 'User', text: "Hello, doctor. I've been feeling some discomfort in my chest lately." },
    { sender: 'Doctor', text: "Hi there. I'm sorry to hear that. Can you describe the discomfort?" },
    { sender: 'User', text: "It feels like a pressure or tightness in my chest, and sometimes it radiates to my left arm." },
    { sender: 'Doctor', text: "That sounds concerning. Have you experienced any shortness of breath or nausea along with it?" },
    { sender: 'User', text: "Yes, I've noticed some shortness of breath, especially when I exert myself." },
    { sender: 'Doctor', text: "Okay. Given your symptoms, it's important to rule out any cardiac issues. I'd recommend coming in for an evaluation." },
    { sender: 'User', text: "Understood. Should I be worried about a heart attack?" },
    { sender: 'Doctor', text: "While I can't diagnose without an examination, your symptoms are concerning. It's better to err on the side of caution." },
    { sender: 'User', text: "Thank you, doctor. I'll schedule an appointment right away." },
    { sender: 'Doctor', text: "You're welcome. Take care, and I'll see you soon." }]);
  
    const [newMessage, setNewMessage] = useState('');
  
    const handleSendMessage = (event) => {
      event.preventDefault();
      if (newMessage.trim() !== '') {
        const updatedMessages = [...messages, { sender: 'User', text: newMessage }];
        setMessages(updatedMessages);
        setNewMessage('');
      }
    };
  
    return (
        <Container>
             <Row className="mt-1">
            <Col>
            <Link to="/askexperts">
              <Button variant="outline-primary">Torna indietro</Button>
              </Link>
            </Col>
          </Row>
            <Row >
      <div > {/* Applica la classe container-chat dal CSS fornito */}
        <div className="message-container row-small">
          {messages.map((message, index) => (
            <div key={index} className={` ${message.sender === 'User' ? 'user-message' : ''}`}>
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
      </Row>
      </Container>
    );
  };

export {Chatexpert};
import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

// ... (remaining imports unchanged)

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with the current date
    const [showModal, setShowModal] = useState(false);
  
    const handleDateClick = (date) => {
      setSelectedDate(date);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const generateCalendar = () => {
      if (!selectedDate) return [];
  
      const daysInMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      ).getDate();
  
      const firstDayOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      ).getDay();
  
      const calendar = [];
  
      for (let i = 1; i <= daysInMonth + firstDayOfMonth; i++) {
        const date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          i - firstDayOfMonth
        );
  
        const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
  
        calendar.push(
          <Col key={i} className={`day ${isCurrentMonth ? 'current-month' : ''}`}>
            {isCurrentMonth && (
              <Button
                variant="link"
                className={`date-button border rounded p-2 d-flex justify-content-between ${
                  date.getDate() === selectedDate.getDate() ? 'bg-primary text-white' : ''
                }`}
                onClick={() => handleDateClick(date)}
              >
                <span>{date.getDate()}</span>
              </Button>
            )}
          </Col>
        );
      }
  
      return calendar;
    };
  
    return (
      <Container>
        <Row className="mt-3">
          <Col>
            <h2 className="text-center">
              {selectedDate && selectedDate.toLocaleString('default', { month: 'long' })}{' '}
              {selectedDate && selectedDate.getFullYear()}
            </h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <Button
              variant="primary"
              onClick={() => setSelectedDate(new Date())}
            >
              Today
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <Button
              variant="outline-primary"
              onClick={() =>
                setSelectedDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() - 1,
                    1
                  )
                )
              }
            >
              Previous Month
            </Button>{' '}
            <Button
              variant="outline-primary"
              onClick={() =>
                setSelectedDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() + 1,
                    1
                  )
                )
              }
            >
              Next Month
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Col key={day} className="text-center">
              <strong>{day}</strong>
            </Col>
          ))}
        </Row>
        <Row className="days mt-2">{generateCalendar()}</Row>
  
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedDate.toDateString()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Modal content goes here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  };
  
  export {Calendar};
  
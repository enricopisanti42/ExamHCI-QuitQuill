import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with the current date
  const [showModal, setShowModal] = useState(false);

  const today=new Date();
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

    const calendar = [];
    let currentDate = 1;

    for (let i = 0; i < Math.ceil(daysInMonth / 7); i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          currentDate
        );

        row.push(
          <Col key={`${i}-${j}`} className={`day ${
            date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear() ? 'current-day' : ''
          }`}>
            {currentDate <= daysInMonth && (
              <Button
                className={`date-button border rounded p-2 d-flex justify-content-center align-items-center ${
                  date.getDate() === selectedDate.getDate() ? 'bg-primary text-white' : ''
                }`}
                onClick={() => handleDateClick(date)}
              >
                {currentDate}
              </Button>
            )}
          </Col>
        );

        currentDate++;
      }
      calendar.push(<Row key={i} className="days mt-2">{row}</Row>);
    }

    return calendar;
  };

  return (
    <Container>
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
            <i className="bi bi-caret-left-fill"></i>
          </Button>{' '}
          </Col>
          <Col>
          <h2 className="text-center">
            {selectedDate && selectedDate.toLocaleString('default', { month: 'long' })}{' '}
            {selectedDate && selectedDate.getFullYear()}
          </h2>
        </Col>
          <Col>
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
          <i className="bi bi-caret-right-fill"></i>
          </Button></Col>
      </Row>
      <Row className="mt-1">
        <Col className="text-center">
          <Button
            variant="primary"
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </Button>
        </Col>
      </Row>    
      {generateCalendar()}
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

export { Calendar };
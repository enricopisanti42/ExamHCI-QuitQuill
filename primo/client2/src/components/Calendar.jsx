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

  //Aggiunto per mostrare la lista dei report

  const ReportsList = ({ reportn }) => {

    const reports1 = [
      {
        Mood: 0,
        Smoked: 1,
        Feelings: "Feeling sad today",
        Time: "10:00 am"
      },
      {
        Mood: 2,
        Smoked: 0,
        Feelings: "Feeling happy today",
        Time: "03:00 pm"
      }
    ];
    
    const reports2 = [
      {
        Mood: 1,
        Smoked: 0,
        Feelings: "Feeling neutral today",
        Time: "09:30 am"
      },
      {
        Mood: 2,
        Smoked: 1,
        Feelings: "Feeling happy today",
        Time: "02:15 pm"
      },
      {
        Mood: 0,
        Smoked: 1,
        Feelings: "Feeling sad today",
        Time: "11:45 am"
      }
    ];

    const reports3 = [
      {
        Mood: 1,
        Smoked: 0,
        Feelings: "Feeling neutral today",
        Time: "09:30 am"
      }
    ];

    let reports = [];

    switch (reportn) {
      case 1:
        reports = reports1;
        break;
      case 2:
        reports = reports2;
        break;
      case 3:
        reports = reports3;
        break;
      default:
        reports = []; // Assegna un array vuoto come fallback
        break;
    }
    
    const getMoodIcon = (mood) => {
      switch (mood) {
        case 0:
          return <span role="img" aria-label="sad face">😢</span>; // sad face
        case 1:
          return <span role="img" aria-label="neutral face">🙂</span>; // neutral face
        case 2:
          return <span role="img" aria-label="happy face">😊</span>; // happy face
        default:
          return <span role="img" aria-label="neutral face">🙂</span>; // Default to neutral face
      }
    }; 
    return (
      <div>
        <h3>Reports written on that date:</h3>
        <ul>
          {reports.map((report) => (
            <>
         <Container className='repo-container'>
          <Row>
            <Col>
              <strong>Mood:</strong> {getMoodIcon(report.Mood)}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong> {report.Smoked ? 'you were tempted to smoke' : 'you were not tempted to smoke'}</strong>
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Your Feelings:</strong> {report.Feelings}
            </Col>
             <Col xs={3} className='text-right'>
             {report.Time}
             </Col>
          </Row>
        </Container>
        <br></br>
        </>
          ))}
        </ul>
      </div>
    );
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
          } riga-calendar`}
          onClick={() => handleDateClick(date)} >
            {currentDate <= daysInMonth && (
              <Button
              className={date.getDate() === selectedDate.getDate() ? 'date-button-selected border rounded p-2 d-flex justify-content-center align-items-center' : 'date-button border rounded p-2 d-flex justify-content-center align-items-center'}
              onClick={() => handleDateClick(date)}
            >
              {currentDate}
            </Button>
            
            )}
            {(date.getDate() === 5 && date.getMonth() === 1 && date.getFullYear() === 2024) || (date.getDate() === 12 && date.getMonth() === 1 && date.getFullYear() === 2024) ? (
              <span role="img" aria-label="trophy" style={{ marginLeft: '30px', fontSize: '1.5em' }}>🏆</span>
            ) : null}

            {(date.getDate() === 5 && date.getMonth() === 1 && date.getFullYear() === 2024) || (date.getDate() === 6 && date.getMonth() === 1 && date.getFullYear() === 2024) || 
             (date.getDate() === 9 && date.getMonth() === 1 && date.getFullYear() === 2024) || (date.getDate() === 12 && date.getMonth() === 1 && date.getFullYear() === 2024)
            ? (
              <span role="img" aria-label="book" style={{ marginLeft: '15px', fontSize: '1.5em' }}>📖</span>
            ) : null}
            
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
            className = "bottone-today"
          >
            Today
          </Button>
          <Button
            variant="primary"
            onClick={() => setSelectedDate(new Date())}
            className = "bottone-selected"
          >
            Selected
          </Button>
        </Col>
      </Row>    
      {generateCalendar()}
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedDate.toDateString()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(selectedDate.getDate() === 5 && selectedDate.getMonth() === 1 && selectedDate.getFullYear() === 2024) ? (
          <>
          <p>Congratulations! <br></br> <br></br>
          In this date you unlocked the achievement: 
          <br></br><br></br>
          20 cigarettes not smoked</p>
          <ReportsList reportn={1}></ReportsList>
          </>
        ) : (selectedDate.getDate() === 12 && selectedDate.getMonth() === 1 && selectedDate.getFullYear() === 2024) ? (
          <>
          <p>Congratulations! <br></br> <br></br>
          In this date you unlocked the achievement: 
          <br></br><br></br>
          "Coughing and shortness of breath decrease."</p>
          <ReportsList reportn={2}></ReportsList>
          </>
        ) : (selectedDate.getDate() === 6 && selectedDate.getMonth() === 1 && selectedDate.getFullYear() === 2024) ? (
          <ReportsList reportn={3}></ReportsList>
        ) : (selectedDate.getDate() === 9 && selectedDate.getMonth() === 1 && selectedDate.getFullYear() === 2024) ? (
          <ReportsList reportn={1}></ReportsList>
        ) : (
          <p>No achievements or report for this date.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    <br></br>
    <Row>
    <span role="img" aria-label="trophy" style={{fontSize: '2em' }}>🏆 In this date you achieved a milestone</span>
    <span role="img" aria-label="book" style={{fontSize: '2em' }}>📖 In this date you wrote a report</span>
    </Row>
    </Container>
  );
};

export { Calendar };
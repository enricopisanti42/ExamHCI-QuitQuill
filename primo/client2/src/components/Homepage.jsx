import 'dayjs';

import { Table, Form, Button,Container,Row,Col } from 'react-bootstrap/'

import { Link, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

// FARE NEL DB UNA TABELLA CON CUI CI SALVIAMO IL TEMPO DI INIZIO E IL TEMPO DEVE ESSERE CALCOLATO COME DIFFERENZA DAL TEMPO ATTUALE
// ULTERIORE COSA DA SALVARE NEL DB é LA CHAT 
// DA INSERIRE IL TRAKING DEL DAY --> GIORNO, ORA, MOOD, tempted or not, Text

const Timer = (props) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = { ...prevTime };

        // Increment minutes
        newTime.minutes += 1;

        // Adjust hours and reset minutes when reaching 60 minutes
        if (newTime.minutes === 60) {
          newTime.hours += 1;
          newTime.minutes = 0;
        }

        // Adjust days and reset hours when reaching 24 hours
        if (newTime.hours === 24) {
          newTime.days += 1;
          newTime.hours = 0;

          props.setMoney((prevMoney) => prevMoney + 1);
        }

        return newTime;
      });
    }, 60000); // Update every minute (60,000 milliseconds)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [props.money]); // The empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div>
      <p>
        {time.days} days 
      </p> 
      <p>
      {time.hours} hours
      </p>
      <p>
      {time.minutes} minutes
      </p>
    </div>
  );
};




function Homelayout(props) {
  
  const [money, setMoney] = useState(0);


  return (
    <Container>
    <Row>
      <Col><b>Since you stopped:</b></Col>
      <Col><b>Money saved:</b></Col>
    </Row>
    <Row>
      <Col><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
</svg></Col>
      <Col><Timer setMoney={setMoney}></Timer></Col>
      <Col><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
  <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
  <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
  <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
</svg></Col>
      <Col>{money}</Col>
    </Row>
  </Container>
  );
}
  


export {Homelayout};

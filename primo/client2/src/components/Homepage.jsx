import 'dayjs';

import { Table, Form, Button,Container,Row,Col } from 'react-bootstrap/'

import { Link, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import API from '../API';

const ReportsList = ({ reports }) => {

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 0:
        return <i className="bi bi-emoji-frown" style={{ fontSize: '1.5rem' }}></i>; // sad face
      case 1:
        return <i className="bi bi-emoji-neutral" style={{ fontSize: '1.5rem' }}></i>; // neutral face
      case 2:
        return <i className="bi bi-emoji-smile" style={{ fontSize: '1.5rem' }}></i>; // happy face
      default:
        return <i className="bi bi-emoji-neutral" style={{ fontSize: '1.5rem' }}></i>; // Default to neutral face
    }
  };
  return (
    <div>
      <h3>Reports:</h3>
      <ul>
        {reports.map((report) => (
       <Container className='repo-container'>
       <Row>
       <Col>
                <strong>Mood:</strong> {getMoodIcon(report.Mood)}
              </Col>
           <Col xs={3} className='text-right'>
            <p>EDIT BUTTON da fare</p>
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
        ))}
      </ul>
    </div>
  );
};


const Timer = (props) => {
  //const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0 });
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const getTimeFromAPI = async () => {
      try {
        // Ottenere la data dal database utilizzando la funzione fetchtime
        const data = await API.fetchTime();
        console.log(data);
        const dateFromDB = new Date(data.Start);
        console.log(dateFromDB);

        const updateTimer = () => {
          // Calcolare la differenza tra la data ottenuta dall'API e la data attuale
          const currentDate = new Date();
          /*
          const differenceInMilliseconds = currentDate - dateFromDB;

          // Convertire la differenza in giorni, ore e minuti
          const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
          const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

          setTime({ days, hours, minutes });
          */

          const differenceInSeconds = Math.floor((currentDate - dateFromDB) / 1000);
          
          // Convertire la differenza in giorni, ore, minuti e secondi
          const days = Math.floor(differenceInSeconds / (24 * 3600));
          const hours = Math.floor((differenceInSeconds % (24 * 3600)) / 3600);
          const minutes = Math.floor((differenceInSeconds % 3600) / 60);
          const seconds = differenceInSeconds % 60;

          const newMoney = days * 5;

          // Aggiorna lo stato di money solo se il valore è cambiato
          if (newMoney !== props.money) {
            props.setMoney(newMoney);
          }


          setTime({ days, hours, minutes, seconds });
        };

        // Esegui l'aggiornamento del timer all'avvio
        updateTimer();

        // Avvia il timer per aggiornare il tempo ogni minuto
        //const intervalId = setInterval(updateTimer, 60000);
        const intervalId = setInterval(updateTimer, 1000);

        // Pulisci l'intervallo quando il componente viene smontato
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    getTimeFromAPI();
  }, []);

  return (
    <div>
      <p>{time.days} days</p>
      <p>{time.hours} hours</p>
      <p>{time.minutes} minutes</p>
      <p>{time.seconds} seconds</p>
    </div>
  );
};




function Homelayout(props) {
  
  const [money, setMoney] = useState(0);
  const [reports,setRepo]=useState([]);
  const [addedRepo,setaddedRepo]=useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const reportDB = await API.getReports();
        setRepo(reportDB);
      } catch (error) {
        console.error("Errore durante il recupero dei messaggi:", error);
      }
    };
    
    fetchData();
  }
    
    ,[addedRepo]);


  return (
    <Container>
    <Row>
      <Col><b>Since you stopped:</b></Col>
      <Col><b>Money saved:</b></Col>
    </Row>
    <Row>
      <Col className='center-icon'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
</svg></Col>
      <Col className='bigger-text'><Timer money={money} setMoney={setMoney}></Timer></Col>
      <Col className='center-icon'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
  <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
  <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
  <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
</svg></Col>
      <Col className='paddedtexttop'>{money}</Col>
    </Row>
    <Row>
      <h2>Remember: You are doing this for your children</h2>
    </Row>
    <Row>
    <h3>Your day so far:</h3>
    </Row>
    <Row>
    <ReportsList reports={reports} />
    </Row>

  </Container>
  );
}
  


export {Homelayout};

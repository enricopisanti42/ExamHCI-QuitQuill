

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';



import { React, useState, useEffect} from 'react';
import { Container, Toast} from 'react-bootstrap/'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import {Navigation} from './components/Navigation';
import { MainLayout, DefaultLayout,LoginLayout, ExpertsLayout } from './components/PageLayout';


import API from './API';

function App() {


  

 

  



  



  const [seat, setSeat] = useState([]);
 


  const [loading, setLoading] = useState(false);

  // This state keeps track if the user is currently logged-in.
  const [loggedIn, setLoggedIn] = useState(false);
  // This state contains the user's info.
  const [user, setUser] = useState(null);




  const [message, setMessage] = useState('');

  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
  }

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const user = await API.getUserInfo();  // here you have the user info, if already logged in
        setUser(user);
        setLoggedIn(true); setLoading(false);
      } catch (err) {
        handleErrors(err)
        setUser(null);
        setLoggedIn(false); setLoading(false);
      }
    };
    init();
  }, []);  // This useEffect is called only the first time the component is mounted.

  /**
   * This function handles the login process.
   * It requires a username and a password inside a "credentials" object.
   */
  const handleLogin = async (credentials) => {

    try {
      const user = await API.logIn(credentials);

      setUser(user);
      setLoggedIn(true);
    } catch (err) {
      // error is handled and visualized in the login form, do not manage error, throw it
      throw err;
    }
  };

  /**
   * This function handles the logout process.
   */ 
  const handleLogout = async () => {
    
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setUser(null);
 
  
  };
  
  
  const filters = {
    'home':  { label: 'Home', url: '/home'},
    'milestones':      { label: 'Milestones', url: '/milestones'},
    'calendar': { label: 'Calendar', url: '/calendar'},
    'askexperts':  { label: 'Need an expert?', url: "/askexperts" },
  };



  return (
    <BrowserRouter>
      <Container fluid className='App'>
        <Navigation filters={filters}  />
        
        <Routes>
          <Route path="/" element={ <DefaultLayout filters={filters}/> } >
            <Route index element={ <MainLayout  filters={filters} /> } />
            <Route path="/:filterLabel" element={ <MainLayout  filters={filters}  /> } />


            
          </Route>
          
          
          <Route path="/login" element={!loggedIn ? <LoginLayout login={handleLogin} /> : <Navigate replace to='/' />} />
        </Routes>
        <Toast show={message !== ''} onClose={() => setMessage('')} delay={4000} autohide bg="danger">
            <Toast.Body>{message}</Toast.Body>
          </Toast>
      </Container>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import './App.css';
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'reactstrap';

function App() {
  return (
    <Container>
      <h1>Airline ticket reservation system</h1>
      <Routes/>
    </Container>
  );
}

export default App;

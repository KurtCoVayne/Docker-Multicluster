import React, { useState } from 'react';

import Container from './components/containers';
import NavBar from './components/navbar';
import Authentication from './components/authentication';
import UserCard from './components/userCard';

import './styles/Normalize.css';
import './styles/App.css';

const title='Docker-Multicluster';

function App() {

  const [isLogged, setLogged]=useState(false);

  return (
    <Container title={title}>
      <NavBar title={title}/>
      <Authentication/>
    </Container>
  );
}

export default App;

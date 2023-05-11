import React, { Component } from 'react';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import Navbar from './components/navbar';
import Favs from './pages/favourties';
import SignInUp from './pages/signInUp';
import RestDetails from './components/restDetails';
import Reservations from './pages/reservations';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favourties' element={<Favs />} />
        <Route path='/reservations' element={<Reservations />} />
        <Route path='/auth' element={<SignInUp />} />
        <Route path='/details' element={<RestDetails />} />
      </Routes>
    </div>
  );
}

export default App;

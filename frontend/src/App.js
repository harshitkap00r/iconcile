import './App.css';
import { Routes, Route } from 'react-router-dom';
import User from './Components/User';
import Home from './Components/Home';
import Hotel from './Components/Hotel';
import { useDebugValue, useEffect, useState } from 'react';

// Start backend and frontend server both

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/:user" element={<Home />} />
        <Route path='/:user/:hotel' element={<Hotel />} />
      </Routes>
    </div>
  );
}

export default App;
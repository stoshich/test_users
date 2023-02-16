import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Auth from './pages/Auth';
import Users from './pages/Users';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;

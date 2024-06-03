import React from 'react';
import Register from './auth/Register';
import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import ComposeEmail from './components/ComposeEmail';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ComposeEmail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;

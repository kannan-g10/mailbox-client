import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Error from '../components/Error';

const NonUserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default NonUserRoutes;

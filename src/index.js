import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

import App from './App';

const Index = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Index />);

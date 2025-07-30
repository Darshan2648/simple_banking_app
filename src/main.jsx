import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Make sure this line imports your App component
import './index.css'; // This imports your Tailwind CSS setup

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* This is where your App component is rendered */}
  </React.StrictMode>,
);
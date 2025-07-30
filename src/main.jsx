import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Imports your client-side banking app component
import './index.css'; // Imports your Tailwind CSS styles

// This file simply renders the App component without passing any Firebase-related props.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* The App component is rendered here */}
  </React.StrictMode>,
);

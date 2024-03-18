import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

const container = document.getElementById('createroot'); // Get the container element
const root = createRoot(container); // Create a root instance with the container

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

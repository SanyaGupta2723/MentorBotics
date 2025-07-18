import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';
import { UserProvider } from './context/UserContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </StrictMode>
);
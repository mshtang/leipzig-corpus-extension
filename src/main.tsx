import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.createElement('div');
rootElement.id = 'react-chrome-app';
rootElement.style.width = '500px';
rootElement.style.height = '600px';

document.body.appendChild(rootElement);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

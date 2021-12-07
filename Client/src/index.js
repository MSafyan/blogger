import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ContextProvider} from './context/Context.js'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// "proxy": "http://127.0.0.1:5050/api"

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Flowbite } from 'flowbite-react';
import { Provider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Flowbite>
        <Provider>
          <App />
        </Provider>
    </Flowbite>
  </BrowserRouter>
);

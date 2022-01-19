import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from 'use-shopping-cart/react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider mode="payment" currency="USD" language="en-US">
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

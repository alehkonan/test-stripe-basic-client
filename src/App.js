import React from 'react';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Checkout } from './pages/Checkout';
import { Layout } from './layout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Success } from './pages/Success';

const stripeKey = process.env.REACT_APP_STRIPE_PUB_KEY;

export default function App() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const clientSecret = searchParams.get('client_secret');

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="success" element={<Success />} />
        {clientSecret && (
          <Route
            path="checkout"
            element={
              <Elements
                stripe={loadStripe(stripeKey)}
                options={{ clientSecret }}
              >
                <Checkout />
              </Elements>
            }
          />
        )}
      </Route>
    </Routes>
  );
}

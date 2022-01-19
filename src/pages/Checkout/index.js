import {
  PaymentElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useShoppingCart } from 'use-shopping-cart/react';

export const Checkout = () => {
  const cart = useShoppingCart();
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  const [error, setError] = useState(null);

  const pay = async (e) => {
    e.preventDefault();
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (error) {
      setError(error);
    } else {
      cart.clearCart();
      navigate(`/success?payment_id=${paymentIntent.id}`);
    }
  };

  return (
    <Container>
      <Form className="p-5" onSubmit={pay}>
        <PaymentElement />
        {/* <PaymentRequestButtonElement /> */}
        <Button type="submit" className="mt-3">
          Pay
        </Button>
      </Form>
      {error && (
        <Alert
          onClose={() => setError(null)}
          className="position-fixed bottom-0"
          variant="danger"
          dismissible
        >
          {error?.message}
        </Alert>
      )}
    </Container>
  );
};

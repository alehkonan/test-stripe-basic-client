import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from 'use-shopping-cart/react';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { PAYMENT_INTENT_URL } from '../../api/endpoints';

export const Cart = () => {
  const navigate = useNavigate();
  const cart = useShoppingCart();
  const cartItems = Object.values(cart.cartDetails);

  const checkout = async () => {
    const paymentIntentParams = {
      amount: cart.totalPrice,
      currency: cart.currency,
    };
    const { data } = await axios.post(PAYMENT_INTENT_URL, paymentIntentParams);
    navigate(`/checkout?client_secret=${data.client_secret}`);
  };

  return (
    <Container>
      <h2>Cart</h2>
      <ButtonGroup>
        <Button
          disabled={!cart.cartCount}
          variant="outline-primary"
          onClick={() => cart.clearCart()}
        >
          Clear cart
        </Button>
        <Button
          disabled={!cart.cartCount}
          variant="outline-primary"
          onClick={checkout}
        >
          Checkout
        </Button>
      </ButtonGroup>
      <Container className="p-3">
        <ListGroup>
          {cartItems.map((entry) => (
            <ListGroup.Item key={entry.id} className="d-flex gap-2">
              <Badge>{entry.quantity}</Badge>
              <span className="flex-grow-1">
                {entry.name} (<span>{entry.formattedPrice}</span>)
              </span>
              <span className="fw-bold">Total: {entry.formattedValue}</span>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="d-flex gap-2">
            <div className="flex-grow-1">
              <Badge>{cart.cartCount}</Badge>
            </div>
            <span className="fw-bold">Total: {cart.formattedTotalPrice}</span>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </Container>
  );
};

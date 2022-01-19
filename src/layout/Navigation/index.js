import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { NavLink } from './NavLink';
import { useShoppingCart } from 'use-shopping-cart/react';
import Button from 'react-bootstrap/Button';

export const Navigation = () => {
  const { cartCount } = useShoppingCart();
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          A simple store with stripe and useShoppingCart hook
        </Navbar.Brand>
        <Nav className="gap-2 align-items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/cart">
            <Button variant="light">
              Cart {!!cartCount && <Badge>{cartCount}</Badge>}
            </Button>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

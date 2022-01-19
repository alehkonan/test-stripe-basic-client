import React from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

export const Success = () => {
  return (
    <Container className="mt-2">
      <Alert variant="success">Your payment has been succeeded</Alert>
    </Container>
  );
};

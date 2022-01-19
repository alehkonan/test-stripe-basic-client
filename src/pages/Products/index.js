import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { PRODUCTS_URL } from '../../api/endpoints';
import { useShoppingCart } from 'use-shopping-cart/react';
import { formatCurrencyString } from 'use-shopping-cart';

export const Products = () => {
  const { addItem, removeItem } = useShoppingCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(PRODUCTS_URL)
      .then(({ data }) => setProducts(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <h2>All products</h2>
      {loading && <Spinner />}
      <Container className="grid-container">
        {products.map((product) => (
          <Card key={product.id}>
            <Card.Img
              className="card-image"
              src={product.image}
              alt="product image"
            />
            <Card.Title>{product.name}</Card.Title>
            <Card.Subtitle>{product.description}</Card.Subtitle>
            <Card.Text>
              {formatCurrencyString({
                value: product.price,
                currency: product.currency,
              })}
            </Card.Text>
            <ButtonGroup>
              <Button variant="primary" onClick={() => addItem(product)}>
                Add
              </Button>
              <Button variant="danger" onClick={() => removeItem(product.id)}>
                Remove
              </Button>
            </ButtonGroup>
          </Card>
        ))}
      </Container>
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

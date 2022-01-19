## Creating Client side

Documentation is on [official stripe JS docs for React](https://stripe.com/docs/stripe-js/react)

- add simple react app
- install @stripe/react-stripe-js and @stripe/stripe-js
- add Publishable key as .env variable
- wrap payment form with Elements component with stripe prop
- create basic form and add CardElement or PaymentElement to it
- then you can use useStripe and useElements hooks to handle this element

- you can also add PaymentRequestButton that uses Payment Request API and accept Apple Pay, Google Pay and Microsoft Pay
- to do it create paymentRequest with paymentRequest method and then add event handlers on it
- PaymentRequestButton rendered only after paymentRequest is ready

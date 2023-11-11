import React from 'react';
import axios from 'axios';
import { checkout } from '../services/api';

const Checkout = () => {
  const handleCheckoutClick = async () => {
    try {
      // Make a request to /create-checkout-session using Axios
      // const response = await axios.post('http://localhost:4000/create-checkout-session', {
      //   items: [
      //     { id: 1, quantity: 3 },
      //     { id: 2, quantity: 1 },
      //   ],
      // });

      const items = [
        { id: 1, quantity: 3},
        { id: 2, quantity: 1},
      ];

      const response = await checkout(items);

      // Check if the request was successful (status code 2xx)
      if (response.status === 200) {
        const { url } = response.data;
        console.log('Checkout Session:', response.data);
        // Handle the session object as needed (e.g., redirect to the checkout page)
        window.location = url;
      } else {
        console.error('Failed to create checkout session');
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckoutClick}>Checkout</button>
    </div>
  );
};

export default Checkout;

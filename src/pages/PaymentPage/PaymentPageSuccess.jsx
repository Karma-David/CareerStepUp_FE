// PaymentPage.js
import React, { useEffect } from 'react';
import Button from '@/components/Button';
import './PayPage.css';


const UpdateUserId = 'https://localhost:7127/UpdateToPremiumUser';
const LoginLord = 'https://localhost:7127/SignInLord';

const PaymentPage = () => {
  // Function to handle the payment process
  const handlePayment = async () => {
    // Extract user_id and vnp_Amount from the URL
    const params = new URLSearchParams(window.location.search);
    const user_id = params.get('user_id');
    const vnp_Amount = params.get('vnp_Amount');

    if (!user_id || !vnp_Amount) {
      console.error('Missing user_id or vnp_Amount in URL parameters');
      return;
    }

    try {
      // Call the UpdateUserId API
      const response = await fetch(UpdateUserId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, amount: vnp_Amount }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.value);

      // Remove the token from localStorage

      // Call the LoginLord API
      const loginResponse = await fetch(LoginLord, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localStorage.getItem('email')), // Assuming user_id is needed for LoginLord
      });

      if (!loginResponse.ok) {
        throw new Error('LoginLord API response was not ok');
      }

      const loginData = await loginResponse.json();
      console.log(loginData.token);
      localStorage.setItem('token', loginData.token);
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  // Use useEffect to run handlePayment when the component mounts
  useEffect(() => {
    handlePayment();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
      <div className="payment-page">
        <div className="payment-container">
          <h1 className="payment-title">Payment Success</h1>
          <Button to ={'/'} >Home</Button>
        </div>
      </div>
  );
};

export default PaymentPage;

// PaymentPage.js
import React, { useState } from 'react';
import './PayPage.css';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  const handlePayment = async () => {
    if (!amount || !name) {
      alert("Please enter all required information.");
      return;
    }

    try {
      const response = await fetch('/api/create_payment_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, name }),
      });

      const data = await response.json();
      if (data && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error("Error creating payment URL:", error);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1 className="payment-title">VNPay Payment</h1>
        <div className="payment-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <label htmlFor="amount">Amount (VND):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <button onClick={handlePayment}>Pay with VNPay</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

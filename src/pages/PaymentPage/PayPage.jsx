// PaymentPage.js
import React from 'react';
import './PayPage.css';

const PaymentApi = 'https://localhost:7127/api/Payments/create-payment';
const GetUserIDApi = 'https://localhost:7127/GetUserIDfromToken';

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      const responseForUserID = await fetch(GetUserIDApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localStorage.getItem('email')),
      });

      const userId = await responseForUserID.json();
      console.log(userId.value);
      
      const responseForLink = await fetch(PaymentApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userId.value),
      });

      const link = await responseForLink.json();
      window.location.href = link.paymentUrl;
      //console.log(link.paymentUrl);
    } catch (error) {
      console.error("Error creating payment URL:", error);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1 className="payment-title">Buy Premium</h1>
        <div className="payment-form">
          <button onClick={handlePayment}>Pay with VNPay</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

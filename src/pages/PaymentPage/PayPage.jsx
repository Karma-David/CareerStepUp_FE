// PaymentPage.js
import React from 'react';
import './Payment.css';

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
        } catch (error) {
            console.error('Error creating payment URL:', error);
        }
    };

    return (
        <div className="payment-page">
            <div className="payment-container">
                <h1 className="payment-title">Upgrade to Premium Account</h1>
                <p className="payment-amount">Price: 500,000 VND</p>
                <p className="payment-description">
                    Enjoy the full benefits of our platform by upgrading to a Premium account. As a Premium member, you
                    will receive:
                </p>
                <ul className="payment-features">
                    <li>Access to exclusive courses and content</li>
                    <li>Ad-free experience</li>
                    <li>Priority customer support</li>
                    <li>Early access to new features</li>
                    <li>And much more!</li>
                </ul>
                <div className="payment-form">
                    <button className="payment-button" onClick={handlePayment}>
                        Pay with VNPay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;

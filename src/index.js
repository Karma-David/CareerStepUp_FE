import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '@/components/GlobalStyle';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <GoogleOAuthProvider clientId='724605755791-uus60sttbtkb0korqu7hpk6d37kv0p8o.apps.googleusercontent.com'>
                <App />
            </GoogleOAuthProvider>
        </GlobalStyles>
    </React.StrictMode>,

    //800257818798-jcvuu7vhsvaij202nvrbjd1n4edm9d6p.apps.googleusercontent.com
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

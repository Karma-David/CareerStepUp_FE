import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '@/components/GlobalStyle';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './style/tailwind.css'; // Import Tailwind CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <GoogleOAuthProvider clientId="724605755791-uus60sttbtkb0korqu7hpk6d37kv0p8o.apps.googleusercontent.com">
                <App />
            </GoogleOAuthProvider>
        </GlobalStyles>
    </React.StrictMode>,
);

reportWebVitals();

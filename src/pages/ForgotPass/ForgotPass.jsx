import React from 'react';
import './ForgotPass.css';
// import Login from '@/pages/Login/Login.jsx';
// import Register from '@/pages/Register/Register.jsx';
import Button from '@/components/Button';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPass = () => {
    // const [action, setAction] = useState('');
    // const [showForgotPassword, setShowForgotPassword] = useState(false);

    // const loginLink = (e) => {
    //     e.preventDefault();
    //     setAction('');
    //     setShowForgotPassword(false);
    // };

    return (
        <div className="ForgotPass-reset">
            <div className="form-box-forgot-password">
                <form action="">
                    <h1>Reset Password</h1>
                    <div className="input-box-email-forgot">
                        <input type="email" placeholder="Email" required />
                        <FaEnvelope className="icon" />
                    </div>
                    <div>
                        <button className="submit-reset" type="submit">
                            Send Reset Link
                        </button>
                    </div>
                    <div className="register-link">
                        <p>
                            Remembered your account?{' '}
                            <Button className="link-button-login" to={'/Login'}>
                                Login
                            </Button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPass;

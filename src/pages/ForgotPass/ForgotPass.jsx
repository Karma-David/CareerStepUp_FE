import React from 'react';
import './ForgotPass.css';
import Button from '@/components/Button';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPass = () => {
   

    // const handleResetPassword = ((e) => {

    // })
    return (
        <div className="ForgotPass-reset">
            <div className="form-box-forgot-password">
                <form action="">
                    <h1>Send Email Reset</h1>
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
                            <Button className="link-button-login" to={'/ResetPass'}>
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

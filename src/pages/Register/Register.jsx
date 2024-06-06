
import React from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import Button from '@/components/Button';

import './Register.css';

const Register = ({ setAction }) => {
    return (
        <div className="form-box-register">
            <form className="form" action="">
                <h1>Registration</h1>
                <div className="register-form">
                    <div className="input-username-register">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-email-register">
                        <input type="email" placeholder="Email" required />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-passwork-register">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> I agree to the terms & conditions
                    </label>
                </div>
                <div>
                    <button className="submit-register" type="submit">
                        Register
                    </button>
                </div>
                <div className="register-link">
                    <p>
                        Already have an account?{' '}
                        <Button className="link-button-login" to={'/Login'}>Login</Button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;

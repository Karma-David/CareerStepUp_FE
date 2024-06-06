import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import Button from '@/components/Button';

import './Login.css';

const LoginAPI = 'https://localhost:7127/SignIn';

const Login = ({ setAction, setShowForgotPassword }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log(formData);
        try {
            const res = await fetch(LoginAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data?.token);
            localStorage.setItem('token', data?.token);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // const forgotPasswordLink = (e) => {
    //     e.preventDefault();
    //     setShowForgotPassword(true);
    // };

    const responseGoogle = (response) => {
        console.log(response);
        // Handle Google login success
    };

    return (
        <div className="form-login">
            <div className="form-box-login">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <div className="input-username">
                            <input
                                onChange={(e) => setFormData({ ...formData, email: e?.target?.value })}
                                type="text"
                                placeholder="Email"
                                required
                            />
                            <FaUser />
                        </div>
                        <div className="input-password">
                            <input
                                onChange={(e) => setFormData({ ...formData, password: e?.target?.value })}
                                type="password"
                                placeholder="Password"
                                required
                            />
                            <FaLock />
                        </div>
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <div className='Forgot-Pass'>
                            {/* <button  className="link-button-Forgot-password" onClick={forgotPasswordLink}>
                            Forgot password?
                        </button> */}
                            <Button className="link-button-Forgot-password" to={'/ForgotPass'}>
                                Forgot PassWork ?
                            </Button>
                        </div>
                    </div>
                    <button className="submit-form-login" type="submit">
                        Login
                    </button>
                    <div className="social-login">
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            render={(renderProps) => (
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="google-login-button"
                                >
                                    Login with Google
                                </button>
                            )}
                        />
                    </div>
                    <div className="register-link">
                        <p>
                            Don't have an account?{' '}
                            <Button className="link-button-Register" to={'/Register'}>
                                Sign in
                            </Button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

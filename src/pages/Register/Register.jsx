import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import Button from '@/components/Button';
import './Register.css';

const RegisterAPI = 'https://localhost:7127/SignUp';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.terms) {
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            try {
                const response = await fetch(RegisterAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                if (response.ok) {
                    alert('Check your email for verification');
                } else {
                    alert('Registration failed');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('An error occurred. Please try again.');
            }
        } else {
            alert('You must agree to the terms and conditions.');
        }
    };

    return (
        <div className="form-box-register">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Registration</h1>
                <div className="register-form">
                    <div className="input-username-register">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-email-register">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-password-register">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="input-password-register">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                </div>
                <div className="remember-forgot">
                    <label>
                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                        />{' '}
                        I agree to the terms & conditions
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
                        <Button className="link-button-login" to={'/Login'}>
                            Login
                        </Button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;

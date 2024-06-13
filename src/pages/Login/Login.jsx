import React, { useEffect, useState, useCallback } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import './Login.css';

const LoginAPI = 'https://localhost:7127/SignIn';
const GoogleLoginApi = 'https://localhost:7127/SignInByGoogle';

const Login = ({ setAction, setShowForgotPassword }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await fetch(LoginAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data?.token);
            localStorage.setItem('token', data?.token);
            navigate('/'); // Chuyển hướng đến HomePage
        } catch (error) {
            console.error('Error:', error);
            alert('Đăng nhập thất bại. Kiểm tra lại Email và PassWord.');
        }
    };

    const handleCallBackResponse = useCallback(
        async (response) => {
            console.log('Google response:', response);

            const credential = response.credential;
            if (!credential) {
                console.error('Credential là null hoặc undefined');
                return;
            }

            console.log('Credential:', credential);

            try {
                const res = await fetch(GoogleLoginApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credential), // Bao bọc credential trong một đối tượng
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log('Response data:', data);
                localStorage.setItem('token', data?.token);
                navigate('/'); // Chuyển hướng đến HomePage
            } catch (error) {
                console.error('Error:', error);
                alert('Đăng nhập Google thất bại. Vui lòng thử lại.');
            }
        },
        [navigate],
    );

    useEffect(() => {
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                if (window.google) {
                    window.google.accounts.id.initialize({
                        client_id: '724605755791-uus60sttbtkb0korqu7hpk6d37kv0p8o.apps.googleusercontent.com',
                        callback: handleCallBackResponse,
                    });
                    window.google.accounts.id.renderButton(document.getElementById('google-login-button'), {
                        theme: 'outline',
                        size: 'large',
                    });
                } else {
                    console.error('Google API không tải đúng cách');
                }
            };
            script.onerror = () => {
                console.error('Lỗi khi tải Google API script');
            };
            document.body.appendChild(script);
        };

        loadGoogleScript();
    }, [handleCallBackResponse]);

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
                        <div className="Forgot-Pass">
                            <Button className="link-button-Forgot-password" to={'/ForgotPass'}>
                                Forgot Password?
                            </Button>
                        </div>
                    </div>
                    <button className="submit-form-login" type="submit">
                        Login
                    </button>
                    <div id="google-login-button" className="google-login-button"></div>
                    <div className="register-link">
                        <p>
                            Don't have an account?{' '}
                            <Button className="link-button-Register" to={'/Register'}>
                                Sign up
                            </Button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

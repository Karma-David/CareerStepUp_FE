import React, { useEffect, useState, useCallback } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import './Login.css';

const LoginAPI = 'https://localhost:7127/SignIn';
const GoogleLoginApi = 'https://localhost:7127/SignInByGoogle';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

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
            localStorage.setItem('token', data?.token);
            localStorage.setItem('email', formData?.email);

            const infoRes = await fetch('https://localhost:7127/GetInformationFromToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data?.token), // Pass token in body
            });

            if (!infoRes.ok) {
                throw new Error(`HTTP error! status: ${infoRes.status}`);
            }

            const infoData = await infoRes.json();
            console.log(infoData);
            localStorage.setItem('role', infoData?.value?.roles);

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
                    body: JSON.stringify({ credential }), // Bao bọc credential trong một đối tượng
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log('Response data:', data);
                localStorage.setItem('token', data?.token);

                const infoRes = await fetch('https://localhost:7127/GetInformationFromToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: data?.token }), // Pass token in body
                });

                if (!infoRes.ok) {
                    throw new Error(`HTTP error! status: ${infoRes.status}`);
                }

                const infoData = await infoRes.json();
                console.log(infoData?.value?.roles);
                localStorage.setItem('role', infoData?.value?.roles);

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
                        client_id: '129660663213-7j1n3pi2kccbtbbe44r6h27g1f6j2kmg.apps.googleusercontent.com',
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
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                required
                            />
                            <FaLock />
                            {showPassword ? (
                                <FaEyeSlash
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            ) : (
                                <FaEye className="password-toggle" onClick={() => setShowPassword(!showPassword)} />
                            )}
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

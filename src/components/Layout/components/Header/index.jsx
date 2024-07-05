import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import images from '@/assets/images';
import Button from '@/components/Button';
import Tippy from '@tippyjs/react/headless';
import { FaUserCircle } from 'react-icons/fa';
import Search from './Search';

const cx = classNames.bind(style);

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null); // State for storing avatar URL
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            fetchUserProfile(); // Fetch user profile data if authenticated
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('https://localhost:7127/api/Profile/GetProfile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const profileData = await response.json();
            if (profileData && profileData.avatarUrl) {
                setAvatarUrl(profileData.avatarUrl); // Set avatar URL from profile data
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Logo" />
                </div>
                <div>
                    <Search />
                </div>
                <div className={cx('action')}>
                    {isAuthenticated ? (
                        <Tippy
                            interactive
                            render={(attrs) => (
                                <div className={cx('profile-menu')} tabIndex="-1" {...attrs}>
                                    <div className={cx('button-avatar')}>
                                        <Button to="/profile">View My Profile</Button>
                                        <Button to="/RegisterLecturer">Register Lecturer</Button>
                                        <Button onClick={handleLogout}>Log out</Button>
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cx('avatar')}>
                                {avatarUrl ? <img src={avatarUrl} alt="User Avatar" /> : <FaUserCircle size={40} />}
                            </div>
                        </Tippy>
                    ) : (
                        <>
                            <Button to="/Register">Sign in</Button>
                            <Button to="/Login">Log in</Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import images from '@/assets/images';
import Button from '@/components/Button';
import Tippy from '@tippyjs/react/headless';
import { FaUserCircle } from 'react-icons/fa';
import Search from './Search';
import { TbH2 } from 'react-icons/tb';

const cx = classNames.bind(style);

const GetProfileFromEmailAPI = 'https://localhost:7127/api/Profile/GetProfile';
function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null); // State for storing avatar URL
    const navigate = useNavigate();

    const [profile, setProfile] = useState({});

    useEffect(() => {
        const getProfileFromEmail = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    return;
                }

                const res = await fetch(GetProfileFromEmailAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const profileData = await res.json();
                if (!profileData || !profileData.value) {
                    throw new Error('Invalid response received');
                }

                setProfile(profileData.value);
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to fetch profile. Please try again.');
            }
        };

        getProfileFromEmail();
    }, []);

    const rolesString = localStorage.getItem('role') || '';
    const rolesArray = rolesString.split(',').map((role) => role.trim());
    const isAdmin = rolesArray.includes('admin');
    const isLecturer = rolesArray.includes('lecturer');
    const isUserPre = rolesArray.includes('premiumUser');
    // const isUser = rolesArray.includes('user');
    console.log(isAdmin);
    console.log(isLecturer);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
            fetchUserProfile();
        } else {
            setIsAuthenticated(false);
            localStorage.setItem('isAuthenticated', 'false');
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
        // localStorage.clear();
        localStorage.removeItem('role');
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

                <div style={{ display: 'flex', justifyContent: 'space-between' }} className={cx('action')}>
                    <div>
                        {isUserPre && (
                            <h2
                                style={{
                                    marginTop: '7px',
                                    border: '2px solid gold',
                                    backgroundColor: '#fff8dc',
                                    padding: '6px',
                                    borderRadius: '5px',
                                    color:'#d4af37'
                                }}
                            >
                                Premium
                            </h2>
                        )}
                    </div>
                    {isAuthenticated ? (
                        <Tippy
                            interactive
                            render={(attrs) => (
                                <div className={cx('profile-menu')} tabIndex="-1" {...attrs}>
                                    <div className={cx('button-avatar')}>
                                        <Button to="/profile">View My Profile</Button>
                                        {!isUserPre && <Button to="/PayPage">Up Premium</Button>}
                                        {!isAdmin && !isLecturer && (
                                            <Button to="/RegisterLecturer">Register Lecturer</Button>
                                        )}
                                        {isLecturer && <Button to="/Upload">My Course</Button>}

                                        <Button onClick={handleLogout}>Log out</Button>
                                    </div>
                                </div>
                            )}
                        >
                            <div style={{ paddingLeft: '102px' }} className={cx('avatar')}>
                                {profile.avatar_Url ? (
                                    <img
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            borderRadius: '50%',
                                            objectFit: 'contain',
                                            border: '1px solid',
                                        }}
                                        src={profile.avatar_Url}
                                        alt="User Avatar"
                                    />
                                ) : (
                                    <FaUserCircle size={40} />
                                )}
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

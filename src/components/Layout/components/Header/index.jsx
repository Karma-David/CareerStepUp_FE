import { useEffect, useState } from 'react';
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
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/'); // Chuyển hướng đến trang home page
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Logo"  />
                </div>
                <div>
                    <Search />
                    {/* search */}
                </div>
                <div className="">
                    <div className={cx('action')}>
                        {isAuthenticated ? (
                            <Tippy
                                interactive
                                render={(attrs) => (
                                    <div className={cx('profile-menu')} tabIndex="-1" {...attrs}>
                                        <div className={cx('button-avatar')}>
                                            <Button to="/profile"> View My Profile </Button>
                                            <Button to="/RegisterLecturer">Register Lecturer</Button>
                                            <Button onClick={handleLogout}>Log out</Button>
                                        </div>
                                    </div>
                                )}
                            >
                                <div style={{ paddingLeft: '165px' }} className={cx('avatar')}>
                                    <FaUserCircle size={40} />
                                </div>
                            </Tippy>
                        ) : (
                            <>
                                <Button to={'/Register'}>Sign in</Button>
                                <Button to={'/Login'}>Log in</Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

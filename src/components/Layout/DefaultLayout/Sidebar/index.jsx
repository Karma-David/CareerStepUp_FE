import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faRoad,
    faUser,
    faGraduationCap,
    // faGauge,
    // faTable,
    // faChartBar,
    // faCashRegister,
    // faMoneyBill,
    // faUpload,
    faMoneyBill,
    faBookBookmark,
} from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import ButtonSidebar from '@/components/Layout/DefaultLayout/ButtonSidebar';

const cx = classNames.bind(style);

const Sidebar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLecturer, setIsLecturer] = useState(false);

    useEffect(() => {
        const rolesString = localStorage.getItem('role') || '';
        const rolesArray = rolesString.split(',').map((role) => role.trim());
        setIsAdmin(rolesArray.includes('admin'));
        setIsLecturer(rolesArray.includes('lecturer'));

        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []);

    return (
        <aside style={{ border: '1px solid #8cbd8530' }} className={cx('wrapper')}>
            <div className={cx('button-sidebar')}>
                <ButtonSidebar to={'/'}>
                    <FontAwesomeIcon style={{ color: 'black' }} icon={faHouse} className={cx('icon', 'black-icon')} />
                    <span style={{ color: 'black' }} className={cx('text')}>
                        Trang chủ
                    </span>
                </ButtonSidebar>

                <ButtonSidebar to={'/RoadMap'}>
                    <FontAwesomeIcon style={{ color: 'black' }} icon={faRoad} className={cx('icon', 'black-icon')} />
                    <span style={{ color: 'black' }} className={cx('text')}>
                        Lộ Trình
                    </span>
                </ButtonSidebar>

                {/* Hiển thị mục Lecturers chỉ khi role là admin
                {isAdmin && (
                    <ButtonSidebar to={'/Lecturers'}>
                        <FontAwesomeIcon style={{ color: 'black' }} icon={faUser} className={cx('icon', 'black-icon')} />
                        <span style={{ color: 'black' }} className={cx('text')}>
                            Lecturers
                        </span>
                    </ButtonSidebar>
                    
                )}

                <ButtonSidebar to={'/Students'}>
                    <FontAwesomeIcon
                        style={{ color: 'black' }}
                        icon={faGraduationCap}
                        className={cx('icon', 'black-icon')}
                    />
                    <span style={{ color: 'black' }} className={cx('text')}>
                        Learner
                    </span>
                </ButtonSidebar>

                <ButtonSidebar to={'/WithdrawalsList'}>
                    <FontAwesomeIcon
                        style={{ color: 'black' }}
                        icon={faMoneyBill}
                        className={cx('icon', 'black-icon')}
                    />
                    <span style={{ color: 'black' }} className={cx('text')}>
                        WidthDraw
                    </span>
                </ButtonSidebar> */}

                {/* <ButtonSidebar to={'/Course'}>
                <FontAwesomeIcon style={{color:'black'}} icon={faBook} className={cx('icon', 'black-icon')} />
                <span style={{color:'black'}} className={cx('text')}>C-Form</span>
                </ButtonSidebar> */}
                {isAuthenticated && (
                    <>
                        {isAdmin && (
                            <>
                                <ButtonSidebar to={'/Lecturers'}>
                                    <FontAwesomeIcon
                                        style={{ color: 'black' }}
                                        icon={faUser}
                                        className={cx('icon', 'black-icon')}
                                    />
                                    <span style={{ color: 'black' }} className={cx('text')}>
                                        Lecturers
                                    </span>
                                </ButtonSidebar>
                                <ButtonSidebar to={'/Students'}>
                                    <FontAwesomeIcon
                                        style={{ color: 'black' }}
                                        icon={faGraduationCap}
                                        className={cx('icon', 'black-icon')}
                                    />
                                    <span style={{ color: 'black' }} className={cx('text')}>
                                        Learner
                                    </span>
                                </ButtonSidebar>
                                <ButtonSidebar to={'/WithdrawalsList'}>
                                    <FontAwesomeIcon
                                        style={{ color: 'black' }}
                                        icon={faMoneyBill}
                                        className={cx('icon', 'black-icon')}
                                    />
                                    <span style={{ color: 'black' }} className={cx('text')}>
                                        WidthDraw
                                    </span>
                                </ButtonSidebar>
                                <ButtonSidebar to={'/ListChangingCourse'}>
                                    <FontAwesomeIcon
                                        style={{ color: 'black' }}
                                        icon={faBookBookmark}
                                        className={cx('icon', 'black-icon')}
                                    />
                                    <span style={{ color: 'black' }} className={cx('text')}>
                                        Course
                                    </span>
                                </ButtonSidebar>
                            </>
                        )}

                        {isLecturer && (
                            <ButtonSidebar to={'/Upload'}>
                                <FontAwesomeIcon
                                    style={{ color: 'black' }}
                                    icon={faBookBookmark}
                                    className={cx('icon', 'black-icon')}
                                />
                                <span style={{ color: 'black' }} className={cx('text')}>
                                    My Course
                                </span>
                            </ButtonSidebar>
                        )}
                    </>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;

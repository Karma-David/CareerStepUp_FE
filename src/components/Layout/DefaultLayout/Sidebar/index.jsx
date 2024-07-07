import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRoad, faUser, faGraduationCap, faGauge } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import ButtonSidebar from '@/components/Layout/DefaultLayout/ButtonSidebar';

const cx = classNames.bind(style);

const Sidebar = () => {
    // Lấy role từ local storage, mặc định là mảng rỗng nếu không có
    const rolesString = localStorage.getItem('role') || '';
    const rolesArray = rolesString.split(',').map(role => role.trim());
    const isAdmin = rolesArray.includes('admin');
    console.log(isAdmin);

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

                {/* Hiển thị mục Lecturers chỉ khi role là admin */}
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
                        Students
                    </span>
                </ButtonSidebar>

                <ButtonSidebar to={'/AdminPage'}>
                    <FontAwesomeIcon style={{ color: 'black' }} icon={faGauge} className={cx('icon', 'black-icon')} />
                    <span style={{ color: 'black' }} className={cx('text')}>
                        Dashboard
                    </span>
                </ButtonSidebar>
            </div>
        </aside>
    );
};

export default Sidebar;

import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faRoad,
    faUser,
    faGraduationCap,
    faGauge,
    faChartLine,
    faBook,
    faTable,
} from '@fortawesome/free-solid-svg-icons';

import ButtonSidebar from '@/components/Layout/DefaultLayout/ButtonSidebar';

const cx = classNames.bind(style);

function Sidebar() {
    return (
        <aside style={{ border: ' 1px solid #8cbd8530' }} className={cx('wrapper')}>
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

                <ButtonSidebar to={'/Lecturers'}>
                    <FontAwesomeIcon style={{ color: 'black' }} icon={faUser} className={cx('icon', 'black-icon')} />
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

                {/* <ButtonSidebar to={'/Course'}>
                <FontAwesomeIcon style={{color:'black'}} icon={faBook} className={cx('icon', 'black-icon')} />
                <span style={{color:'black'}} className={cx('text')}>C-Form</span>
                </ButtonSidebar> */}

                <ButtonSidebar to={'/AdminPage'}>
                    <FontAwesomeIcon style={{ color: 'black' }} icon={faGauge} className={cx('icon', 'black-icon')} />
                    <span style={{ color: 'black' }} className={cx('text')}>
                        Dashboard
                    </span>
                </ButtonSidebar>

                <ButtonSidebar to={'/Fees'}>
                    <FontAwesomeIcon
                        style={{ color: 'black' }}
                        icon={faChartLine}
                        className={cx('icon', 'black-icon')}
                    />
                    <span style={{ color: 'black' }} className={cx('text')}>
                        Fees
                    </span>
                </ButtonSidebar>

                <ButtonSidebar to={'/Course'}>
                    <FontAwesomeIcon style={{ color: 'black' }} icon={faBook} className={cx('icon', 'black-icon')} />
                    <span style={{ color: 'black' }} className={cx('text')}>
                        Course
                    </span>
                </ButtonSidebar>

                <ButtonSidebar to={'/NotConfirmedLecturer'}>
                    <FontAwesomeIcon style={{ color: 'black' }} icon={faTable} className={cx('icon', 'black-icon')} />
                    <span style={{ color: 'black' }} className={cx('text')}>
                        L-Form
                    </span>
                </ButtonSidebar>

                {/* <ButtonSidebar to={'/Course'}>
                <FontAwesomeIcon style={{color:'black'}} icon={faBook} className={cx('icon', 'black-icon')} />
                <span style={{color:'black'}} className={cx('text')}>Course</span>
                </ButtonSidebar> */}
            </div>
        </aside>
    );
}

export default Sidebar;

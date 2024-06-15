import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRoad } from '@fortawesome/free-solid-svg-icons';

import ButtonSidebar from '@/components/Layout/DefaultLayout/ButtonSidebar';

const cx = classNames.bind(style);
function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('button-sidebar')}>
                <ButtonSidebar to={'/'}>
                <FontAwesomeIcon style={{color:'black'}} icon={faHouse} className={cx('icon', 'black-icon')} />               
                <span style={{color:'black'}} className={cx('text')}>Trang chủ</span>
                </ButtonSidebar>

                <ButtonSidebar to={'/RoadMap'}>
                <FontAwesomeIcon style={{color:'black'}} icon={faRoad} className={cx('icon', 'black-icon')} />
                <span style={{color:'black'}} className={cx('text')}>Lộ Trình</span>
                </ButtonSidebar>
            </div>
        </aside>
    );
}

export default Sidebar;

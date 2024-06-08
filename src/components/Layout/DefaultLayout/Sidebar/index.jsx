import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRoad} from '@fortawesome/free-solid-svg-icons';

import ButtonSidebar from '@/components/Layout/DefaultLayout/ButtonSidebar';

const cx = classNames.bind(style);
function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <ButtonSidebar to={'/'}>
                <FontAwesomeIcon icon={faHouse} />
            </ButtonSidebar>

            <ButtonSidebar to={'/following'}>
                <FontAwesomeIcon icon={faRoad} />
            </ButtonSidebar>

        </aside>
    );
}

export default Sidebar;

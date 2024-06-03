import classNames from 'classnames/bind';
import style from './PopperStyle.module.scss';

const cx = classNames.bind(style);

function wrapper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default wrapper;

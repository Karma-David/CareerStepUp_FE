import classNames from 'classnames/bind';
import style from './KhoaHocStyle.module.scss';

const cx = classNames.bind(style);

function KhoaHoc() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avata')} src="https://files.fullstack.edu.vn/f8-prod/courses/12.png" alt="JavaScipt" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>Khoa hoc JavaScipt co ban</h4>
            </div>
        </div>
    );
}

export default KhoaHoc;

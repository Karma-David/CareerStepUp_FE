import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import GetAPI from './GetAPI';
import GetCourseUser from './GetCourseUser';
const cx = classNames.bind(style);

function Profile() {
    const [avatar, setAvatar] = useState(null);
    // Nạp URL từ LocalStorage khi thành phần được gắn vào DOM
    useEffect(() => {
        const savedAvatar = localStorage.getItem('avatar');
        if (savedAvatar) {
            setAvatar({ preview: savedAvatar });
        }
    }, []);

    // Dọn dẹp URL trước đó khi thành phần bị hủy hoặc avatar thay đổi
    useEffect(() => {
        if (avatar && avatar.preview && avatar.preview.startsWith('blob:')) {
            const previewUrl = avatar.preview;

            return () => {
                URL.revokeObjectURL(previewUrl);
            };
        }
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            file.preview = previewUrl;

            // Lưu URL vào LocalStorage
            localStorage.setItem('avatar', previewUrl);

            setAvatar(file);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-warrper')}>
                {avatar && <img className={cx('avatar-image')} src={avatar.preview} alt="avatar" />}
                <input className={cx('chosse-image')} type="file" onChange={handlePreviewAvatar} />
            </div>
            <div className={cx('info-wrapper')}>
                <div className={cx('information')}>
                    <h3>Thong tin ca nhan</h3>
                    <GetAPI />
                </div>
                <div className={cx('class-join')}>
                    <h3>Khoa hoc tham gia</h3>
                        <GetCourseUser/>
                </div>
            </div>
        </div>
    );
}

export default Profile;

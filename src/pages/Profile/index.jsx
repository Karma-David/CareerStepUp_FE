import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import GetAPI from './GetAPI';
import GetCourseUser from './GetCourseUser';

const cx = classNames.bind(style);

const GetProfileFromEmailAPI = 'https://localhost:7127/api/Profile/GetProfile';

function Profile() {
    const [profile, setProfile] = useState({});
    const [newPhoto, setNewPhoto] = useState(null);

    useEffect(() => {
        const getProfileFromEmail = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    throw new Error('Email not found in local storage');
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

    const handlePhotoChange = (e) => {
        setNewPhoto(e.target.files[0]);
    };

    const uploadNewPhoto = async () => {
        try {
            const email = localStorage.getItem('email');
            const changePhotoUserAPI = `https://localhost:7127/api/Photos/uploadForUser?email=${email}`;
            if (!email || !newPhoto) {
                alert('Please select a photo and ensure email is available.');
                return;
            }

            const formData = new FormData();

            formData.append('file', newPhoto);

            const res = await fetch(changePhotoUserAPI, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const photoData = await res.json();
            if (!photoData || !photoData.value) {
                throw new Error('Invalid response received');
            }

            setProfile((prevProfile) => ({
                ...prevProfile,
                avatar_Url: photoData.value,
            }));
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to upload photo. Please try again.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-wrapper')}>
                <img className={cx('avatar-image')} src={profile.avatar_Url} alt="User Avatar" />
                <input className={cx('choose-image')} type="file" onChange={handlePhotoChange} />
                <button
                    
                    className={cx('save-image')}
                    type="button"
                    onClick={uploadNewPhoto}
                >
                    Save
                </button>
            </div>
            <div className={cx('info-wrapper')}>
                <div className={cx('information')}>
                    <h3>Thông tin cá nhân</h3>
                    <GetAPI />
                </div>
                <div className={cx('class-join')}>
                    <h3>Khóa học tham gia</h3>
                    <GetCourseUser />
                </div>
            </div>
        </div>
    );
}

export default Profile;

import React, { useEffect, useState } from 'react';

const GetProfileFromEmailAPI = 'https://localhost:7127/api/Profile/GetProfile';
const UpdateProfileAPI = 'https://localhost:7127/api/Profile/ChangeProfile';
function GetAPI() {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const getProfileFromToken = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    throw new Error('Token not found in local storage');
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
                alert('Failed to log in. Please try again.');
            }
        };

        getProfileFromToken();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const res = await fetch(UpdateProfileAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const updatedProfile = await res.json();
            setProfile(updatedProfile.value);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    return (
        <div id="information">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateProfile();
                }}
            >
                {profile && (
                    <>
                        <label>
                            User Name:
                            <input
                                type="text"
                                name="userName"
                                value={profile.userName || ''}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Given Name:
                            <input
                                type="text"
                                name="givenName"
                                value={profile.givenName || ''}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName || ''}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <button type="submit">Update</button>
                    </>
                )}
            </form>
        </div>
    );
}

export default GetAPI;

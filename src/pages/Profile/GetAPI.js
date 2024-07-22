import React, { useEffect, useState } from 'react';

const GetProfileFromEmailAPI = 'https://localhost:7127/api/Profile/GetProfile';
const UpdateProfileAPI = 'https://localhost:7127/api/Profile/ChangeProfile';

function GetAPI() {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const getProfileFromToken = async () => {
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
                console.error('Error fetching profile:', error);
                setError('Failed to fetch profile. Please try again.');
            }
        };

        getProfileFromToken();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const email = localStorage.getItem('email');
            if (!email) {
                throw new Error('Email not found in local storage');
            }

            const res = await fetch(UpdateProfileAPI, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...profile, email }), // Include email in request body
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const updatedProfile = await res.json();
            setProfile(updatedProfile.value);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Error updating profile. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const buttonStyle = {
        height: '50px',
        backgroundColor: isHovered ? '#007bff' : '#007bff',
        color: isHovered ? 'white' : 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
    };

    return (
        <div id="information">
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                        <button
                            style={buttonStyle}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            type="submit"
                        >
                            <h3>Update</h3>
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}

export default GetAPI;

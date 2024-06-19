import React, { useEffect, useState } from 'react';

const GetEmailAPI = 'https://localhost:7127/GetInformationFromToken';
const GetProfileFromEmailAPI = 'https://localhost:7127/api/Profile/GetProfile';

const GetAPI = () => {
    const [email, setEmail] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const getEmailFromToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found in local storage');
                    alert('Token not found. Please log in again.');
                    return;
                }

                const res = await fetch(GetEmailAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(token),
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const email = await res.text(); // Get response body as text
                console.log(email);
                if (!email) {
                    throw new Error('Empty response received');
                }

                setEmail(email); // Assuming the response contains the email
                getProfileFromEmail(email); // Fetch profile data using the email
            } catch (error) {
                console.error('Error:', error);
                alert('Đăng nhập thất bại. Vui lòng thử lại.');
            }
        };

        getEmailFromToken();
    }, []); // Include getEmailFromToken in the dependency array

    const getProfileFromEmail = async (email) => {
        try {
            const data = { email }; // Create a DataGettingForm object with the email
            const res = await fetch(GetProfileFromEmailAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send the DataGettingForm object in the request body
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const profileData = await res.json();
            console.log(profileData); // Assuming response contains profile data
            setProfile(profileData);
        } catch (error) {
            console.error('Error fetching profile:', error);
            if (error.response && error.response.status === 400) {
                alert('Invalid request. Please check your input.');
            } else {
                alert('Error fetching profile data. Please try again.');
            }
        }
    };

    return (
        <div id="information">
            <p>Email: {email}</p>
            {/* Render profile data here */}
            {/* Example: */}
            {profile && (
                <div>
                    <p>Give Name: {profile.value.userName}</p>
                    <p>Last Name: {profile.value.lastName}</p>
                    {/* Add more profile fields as needed */}
                </div>
            )}
        </div>
    );
};

export default GetAPI;

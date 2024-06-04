import React, { useEffect, useState } from 'react';

// URL của API
const EmailAPI = 'http://localhost:3000/Email';

const GetAPI = () => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        getEmail().then(setEmails);
    }, []);

    // Hàm lấy dữ liệu từ API
    const getEmail = async () => {
        const response = await fetch(EmailAPI);
        const data = await response.json();
        return data;
    };

    // Hàm render dữ liệu ra HTML
    const renderEmail = (emails) => {
        return emails.map((email, index) => (
            <div key={index}>
                <p>
                    Email: <span>{email.Email}</span>
                </p>
                <p>
                    Họ và tên: <span>{email.fullName}</span>
                </p>
                <p>
                    Ngày sinh: <span>{email.Birth}</span>
                </p>
                <p>
                    Địa chỉ: <span>{email.Address}</span>
                </p>
                <p>
                    Số điện thoại: <span>{email.PhoneNumber}</span>
                </p>
            </div>
        ));
    };

    return <div id="infomation">{renderEmail(emails)}</div>;
};

export default GetAPI;

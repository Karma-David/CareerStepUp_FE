// URL của API
var EmailAPI = 'http://localhost:3000/Email';

// Hàm bắt đầu
function start() {
    getEmail(renderEmail);
}
start();

// Hàm lấy dữ liệu từ API
function getEmail(callback) {
    fetch(EmailAPI)
        .then((response) => {
            return response.json();
        })
        .then(callback);
}

// Hàm render dữ liệu ra HTML
function renderEmail(Emails) {
    var listEmail = document.querySelector('.information');
    var htmls = Emails.map((Email) => {
        return `
            <div>
                <p>Email: <span>${Email.Email}</span></p>
                <p>Họ và tên: <span>${Email.fullName}</span></p>
                <p>Ngày sinh: <span>${Email.Birth}</span></p>
                <p>Địa chỉ: <span>${Email.Address}</span></p>
                <p>Số điện thoại: <span>${Email.PhoneNumber}</span></p>
            </div>
        `;
    });
    listEmail.innerHTML = htmls.join('');
}

export default renderEmail;

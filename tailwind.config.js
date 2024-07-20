// tailwind.config.js
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // hoặc 'media' hoặc 'class' nếu bạn muốn bật chế độ tối
    theme: {
        extend: {
            fontSize: {
                '12xl': '12rem', // Kích thước chữ lớn nhất
                '11xl': '11rem', // Kích thước chữ lớn thứ hai
                15: '15px', // Thêm kích thước chữ 15px
            },
            width: {
                'fixed-150': '150px', // Kích thước tùy chỉnh cho chiều rộng
                // Thêm các kích thước khác nếu cần
            },
            height: {
                'fixed-150': '150px', // Kích thước tùy chỉnh cho chiều cao
                // Thêm các kích thước khác nếu cần
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

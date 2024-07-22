import React, { useState } from 'react';
import { TiTick } from 'react-icons/ti';
function CompleteCourse({ userID, courseID }) {
    const [isCompleted, setIsCompleted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const style = {
        marginLeft: '550px',
        fontSize: '20px',
        marginTop: '50px',
        border: '2px solid green',
        borderRadius: '5px',
        backgroundColor: isHovered ? 'lightgreen' : 'transparent', // Thay đổi màu nền khi hover
        transition: 'background-color 0.3s ease', // Thêm chuyển tiếp cho hiệu ứng hover
    };

    const CompleteCourseAPI = `https://localhost:7127/api/Course2/CompletedTheCourse?courseId=${courseID}&user_id=${userID}`;

    const handleCompleteCourse = async () => {
        try {
            const response = await fetch(CompleteCourseAPI, { method: 'POST' });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.statusCode === 200 && data.value.progress === 100) {
                setIsCompleted(true);
            } else {
                throw new Error('Failed to update progress to 100');
            }
        } catch (error) {
            console.error('Error completing course:', error);
        }
    };

    return (
        <div>
            <TiTick
                style={{
                    fontSize: '200px',
                    color: 'green',
                    marginLeft: '550px',
                    border: '2px solid green',
                    borderRadius: '50%',
                    marginBottom: '50px',
                }}
            />
            <h1 style={{ lineHeight: '30px', fontSize: '20px' }}>
                Chúc mừng bạn đã hoàn thành xuất sắc khóa học! Đây là một thành tựu tuyệt vời, đánh dấu sự nỗ lực và
                kiên trì của bạn trong suốt quá trình học tập. Thành quả này không chỉ là một bước tiến lớn trong sự
                nghiệp của bạn mà còn là minh chứng cho khả năng và quyết tâm vượt qua mọi thử thách. Hãy tự hào về
                những gì bạn đã đạt được và tiếp tục giữ vững tinh thần học hỏi, khám phá những kiến thức mới. Chúc bạn
                gặt hái được nhiều thành công hơn nữa trong tương lai!
            </h1>
            <button
                style={style}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleCompleteCourse}
            >
                {isCompleted ? 'Hoàn thành khóa học' : 'Xác nhận hoàn thành khóa học' }
            </button>
        </div>
    );
}

export default CompleteCourse;

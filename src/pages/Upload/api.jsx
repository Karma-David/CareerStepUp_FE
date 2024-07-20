import axios from 'axios';

export const fetchCourseData = async (courseId) => {
    if (courseId !== 0) {
        await axios.post(`https://localhost:7127/api/Course2/CloneDataOnCourseClone?courseId=${courseId}`);
        const response = await axios.get(`https://localhost:7127/api/Course2/GetCourseForm?courseId=${courseId}`);
        return response.data.value;
    }
    return null;
};

export const getLecturerId = async (email) => {
    const lecturerResponse = await fetch('https://localhost:7127/GetUserIDfromToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
    });
    const lecturerData = await lecturerResponse.json();
    return lecturerData.value;
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('https://localhost:7127/api/Course2/UploadPhotoForCourse', formData);
    return response.data.value;
};

export const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('https://localhost:7127/api/Course2/UploadVideoForCourse', formData);
    console.log('Uploaded video URL:', response.data.value);
    return response.data.value;
};

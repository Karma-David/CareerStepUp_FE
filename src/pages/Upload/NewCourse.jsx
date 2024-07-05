import { useEffect, useState } from 'react';
import './Upload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UpTopic from './UpTopic';

const CreateCourseAPI = 'https://localhost:7127/api/Courses/CreateCourse';
function UpNewCourse() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Retrieve email from localStorage
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newCourse') setNewCourse(value);
        if (name === 'description') setDescription(value);
        if (name === 'price') setPrice(value);
        console.log(value);
    };

    const handleAddCourse = () => {
        if (newCourse.trim() !== '') {
            const formData = new FormData();
            formData.append('LecturerEmail', email); // Make sure email is defined and contains the correct value
            formData.append('title', newCourse);
            formData.append('description', description);
            formData.append('price', price);
            if (file) {
                formData.append('course_Img', file);
            }

            // Debugging: log formData contents
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            fetch(CreateCourseAPI, {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((err) => {
                            throw new Error(JSON.stringify(err));
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    setCourses([...courses, data]);
                    setNewCourse('');
                    setDescription('');
                    setPrice(0);
                    setFile(null);
                })
                .catch((error) => {
                    console.error('Error adding course:', error);
                    try {
                        const parsedError = JSON.parse(error.message);
                        console.error('Server response:', parsedError);
                        console.log('Validation errors:', parsedError.errors);
                    } catch (parseError) {
                        console.error('Could not parse error message:', error.message);
                    }
                });
        }
    };
    return (
        <div className="new-course-up">
            <div>
                <h1>New Course</h1>
            </div>
            <div className="write-new-course">
                <input
                    type="text"
                    name="newCourse"
                    placeholder="Enter course name"
                    value={newCourse}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Enter course description"
                    value={description}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Enter course price"
                    value={price}
                    onChange={handleInputChange}
                />
                <input type="file" onChange={handleFileChange} />
            </div>
            <div>
                <button
                    style={{ height: '50px', marginLeft: '660px', marginTop: '40px', borderRadius: '10px' }}
                    onClick={handleAddCourse}
                >
                    <FontAwesomeIcon style={{ marginLeft: '10px', marginRight: '10px' }} icon={faPlus} />
                    <span style={{ marginRight: '10px' }}>Add Course</span>
                </button>
            </div>
            <UpTopic />
        </div>
    );
}

export default UpNewCourse;

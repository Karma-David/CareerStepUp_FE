import React, { useState, useEffect } from 'react';
import './Upload.css';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button';

const CourseUserAPI = 'https://localhost:7127/api/Courses/CourseInLecturerProfile';
const EditCourseAPI = 'https://localhost:7127/api/Courses/EditCourse';
const DeleteCourseAPI = 'https://localhost:7127/api/Courses/DeleteCourse';
const RequestWidthDrawAPI = 'https://localhost:7127/api/Courses/RequestWidthDrawProposeOnACourse';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [email, setEmail] = useState('');
    const [cart, setCart] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        GetCourses().then(setCourses);
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const GetCourses = async () => {
        try {
            const user_id_respone = await fetch('https://localhost:7127/GetUserIDfromToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(localStorage.getItem('email')),
            });

            const user_id = await user_id_respone.json();
            console.log('User ID:', user_id.value);

            const response = await fetch(`${CourseUserAPI}?lecturer_id=${user_id.value}&isConfirmed=true`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data.value);
            return data.value;
        } catch (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newCourse') setNewCourse(value);
        if (name === 'description') setDescription(value);
        if (name === 'price') setPrice(value);
        console.log(value);
    };

    const handleUpdateCourse = (course) => {
        setEditingCourse(course);
        setNewCourse(course.title);
        setDescription(course.description);
        setPrice(course.price);
    };

    const handleSaveCourse = () => {
        const updatedCourse = {
            ...editingCourse,
            title: newCourse,
            description: description,
            price: price,
            course_Img: file, // Handle file update appropriately
        };

        const formData = new FormData();
        formData.append('LecturerEmail', email);
        formData.append('title', newCourse);
        formData.append('description', description);
        formData.append('price', price);
        if (file) {
            formData.append('course_Img', file);
        }

        fetch(`${EditCourseAPI}/${editingCourse.course_id}`, {
            method: 'PUT',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setCourses(
                    courses.map((course) => (course.course_id === editingCourse.course_id ? updatedCourse : course)),
                );
                setEditingCourse(null);
                setNewCourse('');
                setDescription('');
                setPrice(0);
                setFile(null);
            })
            .catch((error) => console.error('Error updating course:', error));
    };

    const handleDeleteCourse = (index) => {
        const courseToDelete = courses[index];
        fetch(`${DeleteCourseAPI}/${courseToDelete.course_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ course_id: courseToDelete.course_id }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const updatedCourses = [...courses];
                updatedCourses.splice(index, 1);
                setCourses(updatedCourses);
            })
            .catch((error) => console.error('Error deleting course:', error));
    };

    const handleEditCourse = (id) => {
        navigate(`/UpTopic/${id}`);
        console.log('Editing course with ID:', id);
    };

    const handleAddToCart = (course) => {
        setSelectedCourse(course);
        setCart((prevCart) => {
            const cartItem = prevCart.find((item) => item.course_id === course.course_id);
            if (cartItem) {
                return prevCart.map((item) =>
                    item.course_id === course.course_id ? { ...item, quantity: item.quantity + 1 } : item,
                );
            } else {
                return [...prevCart, { ...course, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    const handleIncreaseQuantity = (index) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const item = updatedCart[index];
            if (item.quantity < item.subcriber) {
                item.quantity += 1;
            }
            return updatedCart;
        });
    };

    const handleDecreaseQuantity = (index) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const item = updatedCart[index];
            if (item.quantity > 1) {
                item.quantity -= 1;
            }
            return updatedCart;
        });
    };

    const handleQuantityChange = (index, value) => {
        const newQuantity = parseInt(value);
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const item = updatedCart[index];
            item.quantity = newQuantity > item.subcriber ? item.subcriber : newQuantity;
            return updatedCart;
        });
    };

    const handleConfirmWidthDraw = async () => {
        try {
            // Gửi email dưới dạng một object để phù hợp với JSON.stringify
            const user_id_response = await fetch('https://localhost:7127/GetUserIDfromToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(localStorage.getItem('email') ), // Đảm bảo định dạng JSON hợp lệ
            });
    
            if (!user_id_response.ok) {
                throw new Error('Failed to fetch user ID');
            }
    
            const user_id = await user_id_response.json();
    
            // Tạo request object để gửi đi
            const requests = cart.map((course) => ({
                course_id: course.course_id,
                user_id: user_id.value,
                sub: course.quantity,
            }));
    
            console.log('Width Draw requests:', requests);
    
            const response = await fetch('https://localhost:7127/api/Courses/RequestWidthDrawProposeOnACourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requests), // Chuyển requests thành JSON
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }
    
            const result = await response.json();
            console.log('Width Draw request response:', result);
            setShowConfirm(false);
            setCart([]);
        } catch (error) {
            console.error('Error confirming width draw:', error);
        }
    };

    return (
        <div>
            <div style={{ marginLeft: '150px' }} className="list-course-lecturer">
                {courses.map((course, index) => (
                    <div key={course.course_id} className="course-item">
                        <div className="name-course">
                            <h3>{course.title}</h3>
                        </div>
                        <div className="button-handle-course">
                            <button onClick={() => handleUpdateCourse(course)}>Update</button>
                            <button onClick={() => handleDeleteCourse(index)}>Delete</button>
                            <button onClick={() => handleEditCourse(course.course_id)}>Edit Topic - Lesson</button>
                        </div>
                        <div className="name-course">
                            <h3>New Sub: {course.subcriber}</h3>
                        </div>
                        <button
                            className="button-widthdraw"
                            disabled={!(course.dateLeft <= 0 && course.subcriber >= 10)}
                            onClick={() => handleAddToCart(course)}
                        >
                            WidthDraw
                        </button>
                    </div>
                ))}
            </div>
            {editingCourse && (
                <div className="edit-course">
                    <h1>Update Course</h1>
                    <input
                        type="text"
                        name="newCourse"
                        placeholder="Enter new course title"
                        value={newCourse}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter new course description"
                        value={description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter new course price"
                        value={price}
                        onChange={handleInputChange}
                    />
                    <input type="file" onChange={handleFileChange} />
                    <button style={{ margin: '10px' }} onClick={handleSaveCourse}>
                        Save
                    </button>
                    <button style={{ margin: '10px' }} onClick={() => setEditingCourse(null)}>
                        Cancel
                    </button>
                </div>
            )}
            <div className="cart">
                <h2>Width Draw List</h2>
                {cart.length === 0 && <p>Your Width Draw is empty.</p>}
                <ul>
                    {cart.map((course, index) => (
                        <li key={index} className="cart-item">
                            <span>{course.title}</span>
                            <div className="quantity-controls">
                                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                                <input
                                    type="number"
                                    value={course.quantity}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                />
                                <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                            </div>
                            <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
                {cart.length > 0 && <button onClick={() => setShowConfirm(true)}>Confirm Width Draw</button>}
            </div>
            {showConfirm && (
                <>
                    <div className="confirmation-overlay" onClick={() => setShowConfirm(false)}></div>
                    <div className="confirmation-dialog">
                        
                        <table className="confirmation-table">
                            <thead>
                                <tr>
                                    <th>Course Title</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.title}</td>
                                        <td>{course.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p>Are you sure you want to confirm the width draw for the following courses?</p>
                        <button onClick={handleConfirmWidthDraw}>Sure</button>
                        <button onClick={() => setShowConfirm(false)}>Cancel</button>
                    </div>
                </>
            )}
            <div style={{ marginLeft: '615px', marginTop: '30px' }}>
                <Button to="/UpNewCourse">
                    <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={faPlus} />
                    <span style={{ margin: '20px' }}>New Course</span>
                </Button>
            </div>
        </div>
    );
}

export default CourseList;

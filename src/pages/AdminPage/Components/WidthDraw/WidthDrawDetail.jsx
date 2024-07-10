import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './style.css';

const WidthDrawDetail = () => {
  const location = useLocation();
  
  const data = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const jsonData = queryParams.get('data');
    return jsonData ? JSON.parse(decodeURIComponent(jsonData)) : null;
  }, [location.search]);

  const [courses, setCourses] = useState([]);
  const [lecturer, setLecturer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [approveStatus, setApproveStatus] = useState(null); // null, true (approve), or false (reject)

  useEffect(() => {
    if (!data) {  
      setError(new Error('Invalid data.'));
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const userId = data.user_id;

        // Fetch lecturer details
        const lecturerResponse = await axios.get(`https://localhost:7127/api/Lecturer/GetLecturerByID`, { params: { id: userId } });
        setLecturer(lecturerResponse.data.value);

        // Fetch courses details
        const coursesArray = await Promise.all(data.subInACourses.map(async (item) => {
          const courseResponse = await axios.get(`https://localhost:7127/api/Courses/GetCourseById`, { params: { id: item.course_id } });
          return {
            ...courseResponse.data.value,
            subWithdrawn: item.subWithdrawn
          };
        }));

        setCourses(coursesArray);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    if (courses.length > 0) {
      const courseIds = courses.map(course => course.course_id).join(',');
      window.history.pushState({}, '', `?course_ids=${courseIds}`);
    }
  }, [courses]);

  const handleApproval = (isApprove) => {
    setApproveStatus(isApprove);
    setShowModal(true);
  };

  const handleConfirmApproval = async () => {
    setShowModal(false);

    try {
      const userId = data.user_id;
      const response = await axios.put(`https://localhost:7127/api/Courses/CompleteWidthDrawPropse`, null, {
        params: { user_id: userId, isApprove: approveStatus }
      });

      if (response.status === 200) {
        alert(`Withdrawal has been ${approveStatus ? 'approved' : 'rejected'}.`);
      }
    } catch (err) {
      setError(err);
      alert('Error updating withdrawal status.');
    }
  };

  const handleCancelApproval = () => {
    setShowModal(false);
    setApproveStatus(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available.</div>;

  const totalAmount = data.subInACourses.reduce((total, item) => total + (item.subWithdrawn * 10000), 0);
  const priceOnASub = 10000;

  return (
    <div className="withdraw-detail">
      <h1>Withdraw Detail</h1>
      {courses.length > 0 ? (
        <div className="detail-section">
          <h2>Course Details</h2>
          <table className="course-details-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Sub Withdrawn</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.course_id}>
                  <td>{course.course_id}</td>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.subWithdrawn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No courses available.</div>
      )}
      {lecturer && (
        <div className="detail-section">
          <h2>Lecturer Details</h2>
          <div className="form-group">
            <label>ID:</label>
            <span>{lecturer.lecturer_Id}</span>
          </div>
          <div className="form-group">
            <label>Name:</label>
            <span>{lecturer.firstName + " " + lecturer.lastName}</span>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <span>{lecturer.email}</span>
          </div>
        </div>
      )}
      <div className="detail-section">
        <h2>Bill</h2>
        <div className="form-group">
          <label>Total Amount Sub Withdrawn:</label>
          <span>{data.subInACourses.reduce((total, item) => total + item.subWithdrawn, 0)}</span>
        </div>
        <div className="form-group">
          <label>Price on a Sub:</label>
          <span>{priceOnASub} vnd</span>
        </div>
        <div className="form-group">
          <label>Total Amount:</label>
          <span>{totalAmount} vnd</span>
        </div>
      </div>
      <div className="button-group">
        <button className="btn reject-btn" onClick={() => handleApproval(false)}>Reject</button>
        <button className="btn approve-btn" onClick={() => handleApproval(true)}>Approve</button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmation</h2>
            <p>Are you sure you want to {approveStatus ? 'approve' : 'reject'} this withdrawal?</p>
            <button className="btn confirm-btn" onClick={handleConfirmApproval}>Yes</button>
            <button className="btn cancel-btn" onClick={handleCancelApproval}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidthDrawDetail;

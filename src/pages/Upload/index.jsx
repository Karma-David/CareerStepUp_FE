import CourseList from './CourseList';

import './Upload.css';
function Upload() {
    return (
        <div style={{ width: '1400px' }}>
            <h1 style={{ marginLeft: '100px', marginTop: '30px' }}>Your courses</h1>
            <CourseList />
        </div>
    );
}

export default Upload;

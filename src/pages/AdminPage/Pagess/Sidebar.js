// import React from "react";
// import './AdminPage.css';
// import { Link } from "react-router-dom";

// function Sidebar() {
//     return (
//         <div className="bg-white sidebar p-2">
//             <div className="m-2">
//                 <i className="bi bi-tiktok me-3 fs-4"></i>
//                 <span className="brand-name fs-4">TikTok</span>
//             </div>
//             <hr className="text-dark" />
//             <div className="list-group list-group-flush">
//                 <Link to={'/AdminPage'}>
//                 <a className="list-group-item py-2  ">
//                     <i className="bi bi-speedometer2 fs-5 me-3"></i>
//                     <span className='fs-5'>Dashboard</span>
//                 </a>
//                 </Link>
//                 <Link to={'/Lecturers'}>
//                     <a className="list-group-item py-2 " >
//                         <i className="bi bi-person-square fs-5 me-3"></i>
//                         <span className='fs-5'>Lecturers</span>
//                     </a>
//                 </Link>
//                 <Link to={'/Students'}>
//                 <a className="list-group-item py-2 ">
//                     <i className="bi bi-people-fill fs-5 me-3"></i>
//                     <span className='fs-5'>Students</span>
//                 </a>
//                 </Link>
//                 <Link to={'/Course'}>
//                 <a className="list-group-item py-2 ">
//                     <i className="bi bi-book fs-5 me-3"></i>
//                     <span className='fs-5'>Course</span>
//                 </a>
//                 </Link>
//                 <Link to={'/Fees'}>
//                 <a className="list-group-item py-2 ">
//                     <i className="bi bi-graph-up-arrow fs-5 me-3"></i>
//                     <span className='fs-5'>Fees</span>
//                 </a>
//                 </Link>
//                 <Link to={'/'}>
//                 <a className="list-group-item py-2 ">
//                     <i className="bi bi-power fs-5 me-3"></i>
//                     <span className='fs-5'>Logout</span>
//                 </a>
//                 </Link>
//             </div>
//         </div>
//     )
// }
// export default Sidebar
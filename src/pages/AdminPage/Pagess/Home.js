import React from "react";
import './AdminPage.css';


function Home(){
    return(
        <div className="px-3">
            
            <div   className="container-fluid">
                <div  className="row g-3 my-2">
                    <div className="col-md-3 p-1">
                        <div className="p-3 custom-bg-blue shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">2548</h3>
                                <p className="fs-5">Total Students</p>
                            </div>
                            <i className="bi bi-people-fill p-3 fs-1"></i>
                        </div>
                    </div>

                    <div className="col-md-3 p-1">
                        <div className="p-3 custom-bg-yellow shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">245</h3>
                                <p className="fs-5">Total Lecturers</p>
                            </div>
                            <i className="bi bi-person-square p-3 fs-1"></i>
                        </div>
                    </div>

                    <div className="col-md-3 p-1">
                        <div className="p-3 custom-bg-purple shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">35</h3>
                                <p className="fs-5">Total Course</p>
                            </div>
                            <i className="bi bi-book p-3 fs-1"></i>
                        </div>
                    </div>

                    <div className="col-md-3 p-1">
                        <div className="p-3 custom-bg-red shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">890$</h3>
                                <p className="fs-5">Fees collection</p>
                            </div>
                            <i className="bi bi-graph-up-arrow p-3 fs-1"></i>
                        </div>
                    </div>

                </div>
            </div>

<table class="table caption-top bg-white rounded mt-2">
    <caption className="test-white fs-4">New Students List</caption>
        <thead>
            <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Assigned Professor</th>
            <th scope="col">Date Of Admit</th>
            <th scope="col">Status</th>
            <th scope="col">Subject</th>
            <th scope="col">Fees</th>
            
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">1</th>
            <td>Jack Mark</td>
            <td>Airi Satou</td>
            <td>01 June 2024</td>
            <td>Checkin</td>
            <td>HTML CSS</td>
            <td>15$</td>
            </tr>
            <tr>
            <th scope="row">2</th>
            <td>Jimmy Jacob</td>
            <td>Angelica Ramos</td>
            <td>31 May 2024</td>
            <td>Pending</td>
            <td>SASS</td>
            <td>30$</td>
            </tr>
            <tr>
            <th scope="row">3</th>
            <td>Nashid Martines</td>
            <td>Ashton Cox</td>
            <td>30 May 2024</td>
            <td>Canceled</td>
            <td>JavaScript</td>
            <td>25$</td>
            </tr>
            <tr>
            <th scope="row">4</th>
            <td>Vu Nguyen</td>
            <td>Bao Thang</td>
            <td>29 May 2024</td>
            <td>checkin</td>
            <td>NextJS</td>
            <td>20$</td>
            </tr>
            <tr>
            <th scope="row">5</th>
            <td>Roman Aurora</td>
            <td>Cara Stevens</td>
            <td>28 May 2024</td>
            <td>Checkin</td>
            <td>Reponsive</td>
            <td>40$</td>
            </tr>
            <tr>
            <th scope="row">6</th>
            <td>Samantha</td>
            <td>Bruno Nash</td>
            <td>27 May 2024</td>
            <td>Pending</td>
            <td>ReactJS</td>
            <td>35$</td>
            </tr>
        </tbody>
</table>
        </div>
    )
}

export default Home
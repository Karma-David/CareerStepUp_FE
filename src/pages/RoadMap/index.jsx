
import './RoadMap.css';
import FrontEnd from './FrontEnd';
import BackEnd from './BackEnd';
import Database from './Database';
// import Tippy from '@tippyjs/react';

function RoadMap() {
    return (
        <div className="Roadmap-page">
            <div className="roadmap-page-decription">
                <h1>Learning Roadmap</h1>
                <p>
                    Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí
                    "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".
                </p>
            </div>

            {/* bắt đầu một cái road map (Front-End) */}

            <div className="form-container-roadmap">
                <FrontEnd/>
                <BackEnd />
                <Database/>
            </div>
        </div>
    );
}

export default RoadMap;

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
                    To get off to a good start, you should focus on a learning path. For example, to work as a
                    "Front-end Programmer" you should focus on the "Front-end" route.
                </p>
            </div>

            {/* bắt đầu một cái road map (Front-End) */}

            <div className="form-container-roadmap">
                <FrontEnd />
                <BackEnd />
                <Database />
            </div>
        </div>
    );
}

export default RoadMap;

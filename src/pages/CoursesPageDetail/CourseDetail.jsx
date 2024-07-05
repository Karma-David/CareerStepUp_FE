import Button from '@/components/Button';
import './CoursesPageDetail.css';
import { TiTick } from 'react-icons/ti';

function CourseDetail({

    title,
    description,
    targets,
    imageUrl,
    isAuthenticated,
    buttonText,
    onButtonClick,
    courseOverview,
    lecturerInfo,
}) {
    return (
        <div className="container-detail">
            <div className="content-detail">
                <div className="header-detail">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className="content-target-detail">
                    <h3>What will you learn?</h3>
                    <div className="list-target">
                        <ul>
                            {targets.map((target, index) => (
                                <li key={index}>
                                    <TiTick />
                                    <span>{target}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="description-lecturer">
                    <h1>Thông tin giảng viên</h1>
                    <div className="information-lecturer">
                        <img className="img-lecturer" src={lecturerInfo.imageUrl} alt="Lecturer" />
                        <span>
                            {lecturerInfo.description}
                            <div className="lecturer-characteristics">
                                <ul>
                                    {lecturerInfo.characteristics.map((characteristic, index) => (
                                        <li key={index}>
                                            <TiTick style={{color:'#f05123'}} />
                                            <span>{characteristic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a
                                style={{ color: 'red' }}
                                href={lecturerInfo.certificateUrl}
                                target="_blank" // Opens the PDF in a new tab
                                rel="noopener noreferrer" // Security best practice
                            >
                                View certificate
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div className="image-detail">
                <div className="image-course-detail">
                    <img className="image-detail-course" src={imageUrl} alt="Course" />
                </div>
                <div className="box-status-courses">
                    <div className="status-courses">
                        <p>Free</p>
                    </div>
                    <div className="button-start-learn">
                        {isAuthenticated ? (
                            <Button to={'/PageVideoLearn'}>{buttonText}</Button>
                        ) : (
                            <>
                                <Button to={'/Login'} onClick={onButtonClick}>
                                    {buttonText}
                                </Button>
                            </>
                        )}
                    </div>
                    <div className="Course-overview">
                        <ul>
                            {courseOverview.map((overview, index) => (
                                <li key={index}>
                                    {overview.icon}
                                    <span>{overview.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;

import Home from '@/pages/Home';
import RoadMap from '@/pages/RoadMap';
import Profile from '@/pages/Profile';
import Upload from '@/pages/Upload';
import Search from '@/pages/Search';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import ForgotPass from '@/pages/ForgotPass/ForgotPass';
import RegisterLecturer from '@/pages/RegisterLecturer/RegisterLecturer';
import ResetPass from '@/pages/ResetPass/Resetpass';
import PageVideoLearn from '@/pages/PageVideoLearn/PageVideoLearn';
import PayPage from '@/pages/PaymentPage/PayPage';
import { HeaderOnly } from '@/components/Layout';
import Lecturers from '@/pages/AdminPage/Components/Lecturers/Lecturers';
import Students from '@/pages/AdminPage/Components/Students/Students';
import Fees from '@/pages/AdminPage/Components/NotConfirmedLecturer/NotConfirmedLecturer';
import UpTopic from '@/pages/Upload/UpTopic';
import UpLesson from '@/pages/Upload/UpLesson';
import UpNewCourse from '@/pages/Upload/NewCourse';
import CoursesDetail from '@/pages/CoursesPageDetail/CoursesDetail';
import PaymentPageSuccess from '@/pages/PaymentPage/PaymentPageSuccess';
import NotConfirmedLecturer from '@/pages/AdminPage/Components/NotConfirmedLecturer/NotConfirmedLecturer';
import LecturerProfile from '@/pages/AdminPage/Components/Lecturers/LecturerProfile';
import LearnerProfile from '@/pages/AdminPage/Components/Students/LearnerProfile';
import WithdrawalsList from '@/pages/AdminPage/Components/WidthDraw/WidthDraw';
import WidthDrawDetail from '@/pages/AdminPage/Components/WidthDraw/WidthDrawDetail';
import WidthDraw from '@/pages/Upload/WidthDraw';
import CourseDetailForm from '@/pages/Upload/CourseDetailForm';
// import CourseList from '@/pages/Upload/CourseList'; // Import CourseDetailForm
import ListChangingCourse from '@/pages/AdminPage/Components/Course/ListChangingCourse';

export const publishRouter = [
    { path: '/', component: Home },
    { path: '/roadmap', component: RoadMap },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload },
    { path: '/search', component: Search, layout: null },
    { path: '/Login', component: Login, layout: null },
    { path: '/Register', component: Register, layout: null },
    { path: '/ForgotPass', component: ForgotPass, layout: null },
    { path: '/ResetPass', component: ResetPass, layout: null },
    { path: '/RegisterLecturer', component: RegisterLecturer },
    { path: '/PayPage', component: PayPage, layout: null },
    { path: '/Lecturers', component: Lecturers },
    { path: '/Students', component: Students },
    { path: '/Fees', component: Fees },
    { path: '/Upload', component: Upload },
    { path: '/UpTopic/:id', component: UpTopic },
    { path: '/UpLesson/', component: UpLesson },
    { path: '/UpNewCourse', component: UpNewCourse },
    { path: '/PageVideoLearn/:id', component: PageVideoLearn, layout: HeaderOnly },
    { path: '/PayPage', component: PayPage },
    { path: '/PaymentPageSuccess', component: PaymentPageSuccess, layout: null },
    { path: '/Lecturers', component: Lecturers },
    { path: '/NotConfirmedLecturer', component: NotConfirmedLecturer },
    { path: '/LecturerProfile/:lecturerId', component: LecturerProfile },
    { path: '/LearnerProfile/:learnerId', component: LearnerProfile },
    { path: '/WithdrawalsList', component: WithdrawalsList },
    { path: '/WidthDrawDetail', component: WidthDrawDetail },
    { path: '/CoursesDetail/:id', component: CoursesDetail },
    { path: '/WithDraw', component: WidthDraw },
    { path: '/CourseDetailForm/:course_id/:action', component: CourseDetailForm }, // Add CourseDetailForm
    { path: '/ListChangingCourse', component: ListChangingCourse },
];

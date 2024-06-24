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
import AdminPage from '@/pages/AdminPage/AdminPage';
import IntroductToIT from '@/pages/CoursesPageDetail/IntroductToIT';
import PageVideoLearn from '@/pages/PageVideoLearn/PageVideoLearn';
import HtmlCss from '@/pages/CoursesPageDetail/HtmlCss';
import ReponsGridSystem from '@/pages/CoursesPageDetail/ReponsGridSystem';
import PayPage from '@/pages/PaymentPage/PayPage';
import { HeaderOnly } from '@/components/Layout';
import Lecturers from '@/pages/AdminPage/Components/Lecturers/Lecturers';
import Students from '@/pages/AdminPage/Components/Students/Students';
import Fees from '@/pages/AdminPage/Components/Fees/Fees';
import Course from '@/pages/AdminPage/Components/Course/Course';
import PaymentPageSuccess from '@/pages/PaymentPage/PaymentPageSuccess';


export const publishRouter = [
    { path: '/', component: Home },
    { path: '/roadmap', component: RoadMap },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
    { path: '/Login', component: Login, layout: null },
    { path: '/Register', component: Register, layout: null },
    { path: '/ForgotPass', component: ForgotPass, layout: null },
    { path: '/ResetPass', component: ResetPass, layout: null },
    { path: '/AdminPage', component: AdminPage},
    { path: '/RegisterLecturer', component: RegisterLecturer },
    { path: '/IntroductToIT', component: IntroductToIT },
    { path: '/HtmlCss', component: HtmlCss },
    { path: '/ReponsGridSystem', component: ReponsGridSystem },
    { path: '/PageVideoLearn', component: PageVideoLearn, layout: HeaderOnly },
    { path: '/PayPage', component: PayPage},
    { path: '/PaymentPageSuccess', component: PaymentPageSuccess},
];

export const privateRouter = [
    
];

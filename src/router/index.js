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
import { HeaderOnly } from '@/components/Layout';

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
    { path: '/AdminPage', component: AdminPage, layout: null },
    { path: '/RegisterLecturer', component: RegisterLecturer },
    { path: '/IntroductToIT', component: IntroductToIT },
    { path: '/HtmlCss', component: HtmlCss },
    { path: '/ReponsGridSystem', component: ReponsGridSystem },
    { path: '/PageVideoLearn', component: PageVideoLearn, layout: HeaderOnly },
];

export const privateRouter = [];

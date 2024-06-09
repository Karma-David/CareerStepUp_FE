import Home from '@/pages/Home';
import Following from '@/pages/Following';
import Profile from '@/pages/Profile';
import Upload from '@/pages/Upload';
import Search from '@/pages/Search';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import ForgotPass from '@/pages/ForgotPass/ForgotPass';
import RegisterLecturer from '@/pages/RegisterLecturer/RegisterLecturer';
import ResetPass from '@/pages/ResetPass/Resetpass';

import {HeaderOnly} from '@/components/Layout'


export const publishRouter = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout : HeaderOnly},
    { path: '/search', component: Search, layout : null},
    { path: '/Login', component: Login , layout : null},
    { path: '/Register', component: Register , layout : null},
    { path: '/ForgotPass', component: ForgotPass , layout : null},
    { path: '/ResetPass', component: ResetPass , layout : null},
    { path: '/RegisterLecturer', component: RegisterLecturer },

];

export const privateRouter = [];

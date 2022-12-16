import { AuthenticationLayout } from '~/layouts';
import config from '~/config';

import Home from '~/pages/Home';
import Admin from '~/pages/Admin';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';
import DetailProduct from '~/pages/DetailProduct';
import Search from '~/pages/Search'
import Profile from '~/pages/Profile';



//publicRouters

const publicRouters = [
    { path: config.routes.home, component: Home, },

    { path: config.routes.search, component: Search, },
    { path: config.routes.details, component: DetailProduct, },

]

const authRoutes = [
    { path: config.routes.login, component: Login, layout: AuthenticationLayout, status: "login" },
    { path: config.routes.signup, component: SignUp, layout: AuthenticationLayout, status: "signup" },
]
//privateRouters
const privateRouters = [
    { path: config.routes.admin, component: Admin, allowedRoles: "admin" },
    { path: config.routes.profile, component: Profile, allowedRoles: "user" },
]


export { publicRouters, privateRouters, authRoutes }
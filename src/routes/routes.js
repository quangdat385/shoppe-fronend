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
    { path: config.routes.login, component: Login, layout: AuthenticationLayout, },
    { path: config.routes.signup, component: SignUp, layout: AuthenticationLayout, },
]
//privateRouters
const privateRouters = [
    { path: config.routes.admin, component: Admin, allowedRoles: true },
    { path: config.routes.profile, component: Profile },
]


export { publicRouters, privateRouters, authRoutes }
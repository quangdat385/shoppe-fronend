import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from 'jwt-decode';


const useAuth = () => {
    const token = useSelector(selectCurrentToken);

    let isAdmin = false;
    let isManager = false;
    let status = 'USER';

    if (token) {
        const decoded = jwtDecode(token);


        const { user_name, roles, UserId } = decoded.user;

        isManager = roles.includes('MANAGER');
        isAdmin = roles.includes('ADMIN');

        if (isAdmin) status = "ADMIN";
        if (isManager) status = "MANAGER";

        return { user_name, roles, status, isManager, isAdmin, UserId }
    };
    return { user_name: '', roles: [], isManager, isAdmin, status };
}


export default useAuth;
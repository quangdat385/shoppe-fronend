import config from '~/config';
import PropTypes from 'prop-types';

import { useLocation, Navigate } from "react-router-dom";

import useAuth from '~/hooks/useAuth';

const RequireAuth = ({ allowedRoles, children }) => {
    const location = useLocation()

    const { roles } = useAuth()



    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? children
            : <Navigate to={`${config.routes.login}`} state={{ from: location }} replace />
    )

    return content
}

RequireAuth.prototype = {
    children: PropTypes.node.isRequired
}

export default RequireAuth
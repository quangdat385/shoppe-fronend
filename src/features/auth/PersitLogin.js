

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader'

import { useRefreshMutation } from "./authApiSlice";
import usePersist from '~/hooks/usePersists';
import { selectCurrentToken } from '~/features/auth/authSlice';







function PersitLogin({ children }) {
    const [persist] = usePersist();

    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [trueSucceed, setTrueSucceed] = useState();

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    await refresh()
                    setTrueSucceed(true)
                } catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true;
        // eslint-disable-next-line
    }, []);

    let content
    if (!persist) {
        content = children
    } else if (isLoading) {
        if (isLoading) content = <PulseLoader />
    } else if (isError) {
        content = (
            <p className='errmsg'>
                {`${error.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSucceed) {
        content = children
    } else if (token && isUninitialized) {
        content = children
    }

    return content
};

PersitLogin.prototype = {
    children: PropTypes.node.isRequired
}
export default PersitLogin;
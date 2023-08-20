import className from 'classnames/bind';
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';

import styles from './Admin.module.scss';
import AdminContent from './components/AdminContent';
const cx = className.bind(styles)

function Admin() {
    const { pathname } = useLocation();
    useEffect(() => {
        localStorage.setItem("shop-Page", JSON.stringify(pathname));
        // eslint-disable-next-line 
    }, [])

    return (
        <div className={cx('wrapper')}>
            <Routes>
                <Route path="/" element={<AdminContent />}>



                </Route>
            </Routes>
        </div>
    )
}

export default Admin;
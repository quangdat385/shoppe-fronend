import className from 'classnames/bind';
import { Routes, Route } from "react-router-dom";

import styles from './Admin.module.scss';
import AdminContent from './components/AdminContent';
const cx = className.bind(styles)

function Admin() {


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
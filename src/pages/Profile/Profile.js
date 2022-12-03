import className from 'classnames/bind';
import { Routes, Route } from "react-router-dom";
import storage from '~/until/storage';

import { useGetUsersQuery } from "~/features/users/usersApiSlice";
import UserDetails from './UserDetails';
import Gift from '~/pages/Profile/pages/Gift'


import styles from './Profile.module.scss';
import UserContent from './Components/UserContent';
import useAuth from '~/hooks/useAuth';

const cx = className.bind(styles);



function Profile() {
    const { UserId } = useAuth()

    const {
        data: users,
        isSuccess,

    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    if (isSuccess) {
        const user = users.entities[UserId];
        storage.set("user", user.user_name)
    }
    return (
        <div className={cx('wrapper')}>


            <Routes>
                <Route element={<UserContent />}>

                    <Route index element={<UserDetails />}>
                        <Route path="/a" element={<h1>A</h1>}></Route>
                        <Route path="/b" element={<h1>B</h1>}></Route>
                        <Route path="/c" element={<h1>C</h1>}></Route>
                        <Route path="/d" element={<h1>D</h1>}></Route>
                    </Route>
                    <Route path="gift" element={<Gift />}></Route>
                </Route>
            </Routes>

        </div>
    )
}

export default Profile;
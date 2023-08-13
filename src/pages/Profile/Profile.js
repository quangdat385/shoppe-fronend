import className from 'classnames/bind';
import { Routes, Route } from "react-router-dom";
import { useState } from "react";


import storage from '~/until/storage';

import { useGetUsersQuery } from "~/features/users/usersApiSlice";
import UserDetails from './UserDetails';
import Gift from '~/pages/Profile/pages/Gift'


import styles from './Profile.module.scss';
import UserContent from './Components/UserContent';
import useAuth from '~/hooks/useAuth';
import Bank from './UserDetails/Bank';
import Address from './UserDetails/Address';
import ChangePwd from './UserDetails/ChangePwd';

import ShopSpecial from "./pages/ShopSpecial"
import OrderList from './pages/OderList/OrderList';

import Offer from './pages/Gift/Offer';
import CodeSaleOff from './pages/Gift/CodeSaleOff';
import SaleOff from './pages/Gift/SaleOff';
import FreeShip from './pages/Gift/FreeeShep';


import NotifiCation from './pages/NotifiCations';
import Activities from './pages/NotifiCations/Activities';
import PromoTion from './pages/NotifiCations/PromoTion';
import Rating from './pages/NotifiCations/Rating';
import ShopUpdate from './pages/NotifiCations/ShopUpdate';
import WalletUpdate from './pages/NotifiCations/WalletUpdate';

import MyVouCher from "./pages/MyVouCher";
import MyCoin from "./pages/MyCoin";


const cx = className.bind(styles);



function Profile() {
    const { UserId } = useAuth()

    const [query, setQuery] = useState({ update: false });
    const { data: users, isSuccess } = useGetUsersQuery(query, {
        pollingInterval: 60000,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        forceRefetch: true
    },
    );
    let user
    if (isSuccess) {
        user = users.entities[UserId];
        storage.set("user", user.user_name)
    }
    return (
        <div className={cx('wrapper')}>


            <Routes>
                <Route path="/" element={<UserContent user={user} />}>
                    {/* user details */}
                    <Route path="/profile" index element={<UserDetails user={user} setQuery={setQuery} />}>
                    </Route>
                    <Route path="/bank" element={<Bank />}></Route>
                    {isSuccess && <Route path="/password" element={<ChangePwd user={user} />}></Route>}
                    {isSuccess && <Route path="/address" element={<Address user={user} />}></Route>}

                    {/* user gift */}
                    <Route path="/shop/birthday" element={<ShopSpecial />}></Route>

                    <Route path="/gift/voucher" element={<Gift />}>

                    </Route>
                    <Route path="/gift/offer" element={<Offer />}></Route>
                    <Route path="/gift/saleoff" element={<SaleOff />}></Route>
                    <Route path="/gift/code" element={<CodeSaleOff />}></Route>
                    <Route path="/gift/freeship" element={<FreeShip />}></Route>
                    {/* user order */}
                    <Route path="/order/list" element={<OrderList />}></Route>
                    {/* user notifications */}
                    <Route path="/notify/order/updates" element={<NotifiCation />}></Route>
                    <Route path="/notify/promotions" element={<PromoTion />}></Route>
                    <Route path="/notify/wallet/update" element={<WalletUpdate />}></Route>
                    <Route path="/notify/activities" element={<Activities />}></Route>
                    <Route path="/notify/rating" element={<Rating />}></Route>
                    <Route path="/notify/shop/update" element={<ShopUpdate />}></Route>
                    {/* user voucher */}
                    <Route path="/my/voucher" element={<MyVouCher />}></Route>
                    {/* user coin */}
                    <Route path="/my/coin" element={<MyCoin />}></Route>
                </Route>
            </Routes>

        </div>
    )
}

export default Profile;
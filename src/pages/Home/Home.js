import className from 'classnames/bind';
import styles from "./Home.module.scss";


import { Routes, Route, useLocation, useNavigate, } from "react-router-dom";
import { useEffect, } from 'react';


import SuggestProducts from './Components/MainContent.js/SuggestProducts';
import MainContent from './Components/MainContent.js';





import ProductCatalogue from './Components/ProductCatalogue/ProductCatalogue';


import useHomePage from '~/hooks/useHomPage';




const cx = className.bind(styles);



function Home() {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    // eslint-disable-next-line
    const [homePage] = useHomePage();







    useEffect(() => {
        let order, price, collect;
        homePage.popular === "Phổ Biến" ? order = "" : homePage.popular === "Bán Chạy" ? order = "new" : order = "sale";
        homePage.price === "none" ? price = "" : homePage.price === "increase" ? price = "asc" : price = "desc";
        homePage.menu === 0 ? collect = "" : collect = homePage.menu;

        if (pathname === "/home") {
            navigate(`/home/0/sort?${order}${price}${collect}`);
        }


        // eslint-disable-next-line
    }, [pathname, navigate]);


    return <div className={cx("wrapper")}>

        <Routes >
            <Route path="/" element={<MainContent />}>
                <Route path=":page/*" element={<ProductCatalogue />}>
                </Route>

            </Route>
            <Route path="/suggest/:page" element={<SuggestProducts />}></Route>
        </Routes>


    </div>
}

export default Home;
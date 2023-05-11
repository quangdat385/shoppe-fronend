import className from "classnames/bind";


import SubMenu from "./SubMenu";
import ShopVourChers from "../ShopVourChers/ShopVourChers";
import ProductOffer from "../ProductOffer/ProductOffer";
import Banner from "../Banner/Banner";
import AboutShop from "../AboutShop/AboutShop";





import styles from "./MainContent.module.scss";
import { Outlet } from "react-router-dom";
import Slider from "../Slider/Slider";


const cx = className.bind(styles);

function MainContent() {





    let content = (<>
        <Slider />
        <SubMenu />
        <ShopVourChers />
        <ProductOffer title="GỢI Ý DÀNH CHO BẠN " more className="primary" />
        <AboutShop />
        <Banner src="https://down-aka-vn.img.susercontent.com/vn-11134210-23030-lt429zb654nv4f.webp"
        />
        <Outlet />
    </>)

    return (<div className={cx("wrapper")}>
        {content}
    </div>);
}

export default MainContent;
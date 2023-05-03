import className from "classnames/bind";
import { useNavigate } from "react-router-dom";



import SubMenu from "./SubMenu";
import ShopVourChers from "../ShopVourChers/ShopVourChers";
import ProductOffer from "../ProductOffer/ProductOffer";
import Banner from "../Banner/Banner";
import AboutShop from "../AboutShop/AboutShop";
import ProductCatalogue from "../ProductCatalogue/ProductCatalogue";


import styles from "./MainContent.module.scss";


const cx = className.bind(styles)

function MainContent() {

    const navigation = useNavigate()
    console.log(navigation)

    return (<div className={cx("wrapper")}>
        <SubMenu />
        <ShopVourChers />
        <ProductOffer title="GỢI Ý DÀNH CHO BẠN " more className="primary" />
        <AboutShop />
        <Banner src="https://down-aka-vn.img.susercontent.com/vn-11134210-23030-lt429zb654nv4f.webp"
        />
        <ProductCatalogue />



    </div>);
}

export default MainContent;
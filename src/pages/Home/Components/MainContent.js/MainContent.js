import className from "classnames/bind";


import SubMenu from "./SubMenu";
import ShopVourChers from "../ShopVourChers/ShopVourChers";
import ProductOffer from "../ProductOffer/ProductOffer";
import Banner from "../Banner/Banner";
import AboutShop from "../AboutShop/AboutShop";
import images from "~/assets/images";




import styles from "./MainContent.module.scss";
import { Outlet } from "react-router-dom";
import Slider from "../Slider/Slider";
import { useGetProductsQuery } from "~/features/products/productsApiSlice";


const cx = className.bind(styles);

function MainContent() {

    const { data: products, isLoading, isSuccess } = useGetProductsQuery("productsList", {
        pollingInterval: 60000,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });



    let content = (<>
        <Slider />
        <SubMenu />
        <ShopVourChers />
        <ProductOffer title="GỢI Ý DÀNH CHO BẠN " more className="primary" />
        <AboutShop />
        <Banner src={images.aboutShop}
        />
        <ProductOffer title="HOT" />
        <Banner src={images.saleoff} />
        <Banner src={images.newproduct} />
        <ProductOffer title="HÀNG MỚI VỀ" />
        <Banner src={images.croptop} />
        <ProductOffer title="ÁO CROPTOP BA LỖ" />
        <Banner src={images.vaydamnu} />
        <ProductOffer title="VÁY ĐẦM NỮ" />
        <Banner src={images.setbo} />
        <ProductOffer title="SET BỘ" />
        <Banner src={images.dolot} />
        <ProductOffer title="ÁO BRA_QUẦN LÓT NỮ" />
        <Outlet />
    </>)

    return (<div className={cx("wrapper")}>
        {content}
    </div>);
}

export default MainContent;
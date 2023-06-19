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

    const { data: products, isSuccess } = useGetProductsQuery("productsList", {
        pollingInterval: 60000,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    let hot, offer, newproduct, croptop_bullet, dress, set, underwear;
    if (isSuccess) {
        const { entities } = products;
        let term = [];
        for (let value of Object.values(entities)) {
            term.push(value);
        };
        hot = term.sort((a, b) => b.sold - a.sold).slice(0, 6);
        offer = term.slice(0, 6);
        newproduct = term.sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);
        croptop_bullet = term.filter(item => item.details === "Áo Croptop Ba Lỗ").slice(0, 6);
        dress = term.filter(item => item.type_of_product === "Đầm/Váy").slice(0, 6);
        set = term.filter(item => item.type_of_product === "Sét Bộ").slice(0, 6);
        underwear = term.filter(item => item.type_of_product === "Đồ Lót").slice(0, 6);

    };

    let content = (<>
        <Slider />
        <SubMenu />
        <ShopVourChers />
        {isSuccess && <ProductOffer products={offer} title="GỢI Ý DÀNH CHO BẠN " more className="primary" />}

        <AboutShop />
        <Banner src={images.aboutShop}
        />
        {isSuccess && <ProductOffer products={hot} title="HOT" />}

        <Banner src={images.saleoff} />
        <Banner src={images.newproduct} />
        {isSuccess && <ProductOffer products={newproduct} title="HÀNG MỚI VỀ" />}

        <Banner src={images.croptop} />
        {isSuccess && <ProductOffer products={croptop_bullet} title="ÁO CROPTOP BA LỖ" />}

        <Banner src={images.vaydamnu} />
        {isSuccess && <ProductOffer products={dress} title="VÁY ĐẦM NỮ" />}

        <Banner src={images.setbo} />
        {isSuccess && <ProductOffer products={set} title="SET BỘ" />}

        <Banner src={images.dolot} />
        {isSuccess && <ProductOffer products={underwear} title="ÁO BRA_QUẦN LÓT NỮ" />}


    </>)

    return (<div className={cx("wrapper")}>
        {content}
        <Outlet />
    </div>);
}

export default MainContent;
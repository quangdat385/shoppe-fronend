import className from 'classnames/bind';


import NotifyCartItem from './NotifyCartItem';

import product from '~/assets/images/vayhaiday.jfif';
import styles from "./Header.module.scss";

const cx = className.bind(styles)


function NotifyCart() {
    return (
        <div className={cx("notify-cart")}>
            <h4 className={cx("notify-cart-header")}>Sản phẩm đã thêm</h4>
            <NotifyCartItem src={product} alt="product-img" />
            <NotifyCartItem src={product} alt="product-img" />
            <NotifyCartItem src={product} alt="product-img" />
            <NotifyCartItem src={product} alt="product-img" />
        </div>
    );
}

export default NotifyCart;
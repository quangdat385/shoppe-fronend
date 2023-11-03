import className from 'classnames/bind';
import { Link } from 'react-router-dom';

import NotifyCartItem from './NotifyCartItem';

import styles from "./Header.module.scss";

const cx = className.bind(styles)


function NotifyCart({ order }) {

  return (
    <div className={cx("notify-cart")}>
      <h4 className={cx("notify-cart-header")}>Sản phẩm đã thêm</h4>
      {order.map((item) => {
        return <NotifyCartItem key={item.id} order={item} alt="product-img" />
      })}
      {order.length > 0 && <div className={cx("notify-cart-footer")}>
        <div>Thêm vào giỏ hàng</div>
        <Link className={cx("link")} to="/user/cart">Xem Giỏ Hàng</Link>
      </div>}
    </div>
  );
}

export default NotifyCart;
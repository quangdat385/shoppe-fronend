import className from 'classnames/bind';

// import Button from 'react-bootstrap/Button'
import { forwardRef } from "react";
import { formatCurrency } from "~/until/formatNumber";

import styles from "./Header.module.scss";

const cx = className.bind(styles)


function NotifyCartItem({ order, alt }, ref) {


  return (
    <div className={cx("notify-cart-item")}>
      <img
        ref={ref}
        src={`${process.env.REACT_APP_API_IMG_URL}/${order?.img[0][0]}`}
        alt={alt}
        className={cx("notify-cart-img")}
      />
      <div className={cx("notify-cart-item-info")}>
        <div className={cx("notify-cart-item__header")}>
          <h5 className={cx("notify-cart-item__title")}>
            {order.product_title}
          </h5>
          <div className={cx("notify-cart-item__info")}>
            <span className={cx("price")}>
              {formatCurrency((1 - order.sale_off) * order.price)}₫
            </span>
            <span className={cx("plus")}>
              x
            </span>
            <span className={cx("quantity")}>
              {order.quantity}
            </span>

          </div>
        </div>
        {/* <div className={cx("notify-cart-item__body")}>
                    <span className={cx("classify")}>
                        Phân loại : Bạc
                    </span>
                    <Button className={cx("notify-cart-delete")} > Xóa</Button>
                </div> */}
      </div>

    </div>
  );
}

export default forwardRef(NotifyCartItem);
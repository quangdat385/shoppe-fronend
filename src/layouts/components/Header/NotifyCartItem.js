import className from 'classnames/bind';

import Button from 'react-bootstrap/Button'
import { forwardRef } from "react"

import styles from "./Header.module.scss";

const cx = className.bind(styles)


function NotifyCartItem({ src, alt }, ref) {
    return (
        <div fluid className={cx("notify-cart-item")}>
            <img ref={ref} src={src} alt={alt} className={cx("notify-cart-img")} />
            <div className={cx("notify-cart-item-info")}>
                <div className={cx("notify-cart-item__header")}>
                    <h5 className={cx("notify-cart-item__title")}>

                        Váy đầm nữ 2 dây ngọc chất gấm Wikishop màu đen trắng xòe ngắn sexy hàn quốc freesize phom ôm body C938

                    </h5>
                    <div className={cx("notify-cart-item__info")}>
                        <span className={cx("price")}>
                            2.000.000đ
                        </span>
                        <span className={cx("plus")}>
                            x
                        </span>
                        <span className={cx("quantity")}>
                            2
                        </span>

                    </div>
                </div>
                <div className={cx("notify-cart-item__body")}>
                    <span className={cx("classify")}>
                        Phân loại : Bạc
                    </span>
                    <Button className={cx("notify-cart-delete")} > Xóa</Button>
                </div>
            </div>

        </div>
    );
}

export default forwardRef(NotifyCartItem);
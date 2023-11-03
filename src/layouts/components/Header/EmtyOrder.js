import className from 'classnames/bind';

import emtyorder from "~/assets/images/emtyorder.png";

import { forwardRef } from "react"

import styles from "./Header.module.scss";

const cx = className.bind(styles)



function EmtyOrder({ ...props }, ref) {
  return (
    <div className={cx("emty-order", props.className)}>
      <div className={cx("emty-order-wrapper")}>
        <img ref={ref} className={cx("emty-order-img")} src={emtyorder} alt="Thông Báo" />
      </div>
      <div className={cx("emty-order-text")}>Chưa Có Sản Phẩm</div>
    </div>
  );
}

export default forwardRef(EmtyOrder);
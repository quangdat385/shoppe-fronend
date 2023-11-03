
import className from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from "@fortawesome/free-solid-svg-icons";

import styles from "./ShopVourCher.module.scss";


const cx = className.bind(styles)

function DetailVourCher({ vourcher }) {
  const typeVourcherFn = (vourcher) => {
    if (vourcher?.minimum_order.type === "quantity") {
      return {
        decrease: `Giảm ${Math.round(vourcher.sale_off * 100)}`,
        minimum_order: `Đơn Tối Thiểu ${vourcher.minimum_order.quantity} Sản Phảm`
      }
    }
    return {
      decrease: `Giảm }`,
      minimum_order: `Đơn Tối Thiểu `
    }
  }
  const typeVourcher = typeVourcherFn(vourcher)
  return (<div className={cx("vourcher-wrapper")}>
    <div className={cx("vourcher-item")}>
      <div className={cx("vourcher-item-before")}></div>
    </div>

    <div className={cx("vourcher-content")}>
      <div className={cx("vourcher-content-detailt")}>
        <div className={cx("sale-off")}>{typeVourcher.decrease}</div>
        <div className={cx("number-off")}>{typeVourcher.minimum_order}</div>
        <div >
          <FontAwesomeIcon icon={faClock} style={{ color: "#aaa5a5", fontSize: "1.2rem" }} />
          {" "} Có hiệu lực sau: 12 giờ
        </div>
      </div>
      <div className={cx("vourcher-content-btn")}>
        <button className={cx("vourcher-btn")}>Lưu</button>
      </div>

    </div>

  </div>);
}

export default DetailVourCher;
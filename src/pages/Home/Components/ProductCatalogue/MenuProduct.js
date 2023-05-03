import ClassName from "classnames/bind";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProductCatalogue.module.scss";



const cx = ClassName.bind(styles);

function MenuProduct() {
    return (<div className={cx("menu-wrapper")}>
        <div className={cx("menu-item", "active")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span> Sản Phẩm</span>
        </div>
        <div className={cx("menu-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span> Sale Shock</span>
        </div>
        <div className={cx("menu-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span> Hàng mới về</span>
        </div>
        <div className={cx("menu-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span> Áo Croptop Ba Lỗ</span>
        </div>
        <div className={cx("menu-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span> Áo Croptop Có Tay</span>
        </div>
        <div className={cx("menu-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span> Váy Hot Trend</span>
        </div>
        <div className={cx("menu-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span> Sét Đồ Hot Trend</span>
        </div>
        <div className={cx("menu-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span> Quần Đùi - Short</span>
        </div>
        <div className={cx("menu-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span> Quần Dài Hot Trend</span>
        </div>
        <div className={cx("menu-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span>Áo Bra - Quần Lót Nữ</span>
        </div>
        <div className={cx("menu-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
            <span>Quần</span>
        </div>
    </div>
    );
}

export default MenuProduct;

import className from "classnames/bind";
import { Container } from "react-bootstrap";

import styles from "./MainContent.module.scss";

const cx = className.bind(styles);

function HideListMenu({ handleMenu }) {
    return (
        <div className={cx("list-menu-wrapper")}>
            <Container fluid className={cx("menu-list")}>

                <div onClick={() => handleMenu(5)} className={cx("menu-list-item")}>
                    Váy Hot Trend
                </div>
                <div onClick={() => handleMenu(6)} className={cx("menu-list-item")}>
                    Sét Đồ Hot Trend
                </div>
                <div onClick={() => handleMenu(7)} className={cx("menu-list-item")}>
                    Quần Đùi-Short
                </div>
                <div onClick={() => handleMenu(8)} className={cx("menu-list-item")}>
                    Quần Dài Hot Trend
                </div>
                <div onClick={() => handleMenu(9)} className={cx("menu-list-item")}>
                    Áo Bra-Quần Lót Nữ
                </div>
                <div onClick={() => handleMenu(10)} className={cx("menu-list-item")}>
                    Quần
                </div>

            </Container>
        </div>
    );
}

export default HideListMenu;

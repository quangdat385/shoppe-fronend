import className from "classnames/bind";
import { Container } from "react-bootstrap";

import styles from "./MainContent.module.scss";

const cx = className.bind(styles);

function HideListMenu() {
    return (
        <div className={cx("list-menu-wrapper")}>
            <Container fluid className={cx("menu-list")}>

                <a href="" className={cx("menu-list-item")}>
                    Váy Hot Trend
                </a>
                <a href="" className={cx("menu-list-item")}>
                    Sét Đồ Hot Trend
                </a>
                <a href="" className={cx("menu-list-item")}>
                    Quần Đùi-Short
                </a>
                <a href="" className={cx("menu-list-item")}>
                    Quần Dài Hot Trend
                </a>
                <a href="" className={cx("menu-list-item")}>
                    Áo Bra-Quần Lót Nữ
                </a>
                <a href="" className={cx("menu-list-item")}>
                    Túi Sách Đi Học-Đi CHơi
                </a>
                <a href="" className={cx("menu-list-item")}>
                    Quần
                </a>

            </Container>
        </div>
    );
}

export default HideListMenu;

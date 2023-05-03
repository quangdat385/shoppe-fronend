import className from "classnames/bind";
// import { useNavigate } from "react-router-dom";





import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp, faBars } from '@fortawesome/free-solid-svg-icons'



import HideListMenu from "./HideListMenu";

import styles from "./MainContent.module.scss";


const cx = className.bind(styles)

function SubMenu() {




    return (<>
        <div className={cx("sub-menu")}>
            <Container >
                <Row >
                    <Col lg={11} xs={10} >
                        <div className={cx("md-sub-list")}>
                            <FontAwesomeIcon icon={faBars}
                                className={cx("sub-menu-icon")}
                            />
                            <div className={cx("mobie-menu")}>
                                <div className={cx("mobie-menu-item")}>Dạo</div>
                                <div className={cx("mobie-menu-item")}>TẤT CẢ SẢN PHẨM</div>
                                <div className={cx("mobie-menu-item")}>Siêu Sale Tháng 5 </div>
                                <div className={cx("mobie-menu-item")}>Hàng Mới Về </div>
                                <div className={cx("mobie-menu-item")}>Áo Croptop Ba Lỗ </div>
                                <div className={cx("mobie-menu-item")}>Áo Croptop Có Tay</div>
                            </div>
                        </div>


                        <Row className={cx("sub-list")}>
                            <Col lg={2} onClick={() => console.log("abc")} className={cx("sub-list-item", "active")} >Dạo</Col>
                            <Col lg={2} onClick={() => console.log("abc")} className={cx("sub-list-item",)} >TẤT CẢ SẢN PHẨM</Col>
                            <Col lg={2} onClick={() => console.log("abc")} className={cx("sub-list-item",)} >Siêu Sale Tháng 5</Col>
                            <Col lg={2} onClick={() => console.log("abc")} className={cx("sub-list-item",)} >Hàng Mới Về</Col>
                            <Col lg={2} onClick={() => console.log("abc")} className={cx("sub-list-item",)} >Áo Croptop Ba Lỗ</Col>
                            <Col lg={2} onClick={() => console.log("abc")} className={cx("sub-list-item",)} >Áo Croptop Có Tay</Col>
                        </Row>
                    </Col>
                    <Col lg={1} xs={2}>
                        <div className={cx("hide-list")}>
                            <p >Thêm</p>
                            <div className={cx("cart-down")}>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                            <div className={cx("cart-up")}>
                                <FontAwesomeIcon icon={faCaretUp} />

                            </div>
                            <HideListMenu />
                        </div>

                    </Col>
                </Row>


            </Container>

        </div>

    </>);
}

export default SubMenu;
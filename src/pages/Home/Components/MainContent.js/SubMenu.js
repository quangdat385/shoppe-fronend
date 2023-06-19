import className from "classnames/bind";
import { useState, useEffect, memo } from "react";
import { useParams, useNavigate } from "react-router-dom"





import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp, faBars } from '@fortawesome/free-solid-svg-icons'
import useHomePage from "~/hooks/useHomPage";



import HideListMenu from "./HideListMenu";

import styles from "./MainContent.module.scss";


const cx = className.bind(styles)

function SubMenu() {
    const [homePage, setHomePage] = useHomePage();
    const [subMenu, setSubMenu] = useState(homePage.menu);
    const navigate = useNavigate();
    const { page } = useParams();


    const handleMenu = (menu) => {
        setSubMenu(menu);
        window.location.assign(window.location.href)



    }
    useEffect(() => {
        setHomePage(homePage => {
            return { ...homePage, menu: subMenu }
        })


        //eslint-disable-next-line 
    }, [subMenu]);

    useEffect(() => {
        let order, price, collect;
        homePage.popular === "Phổ Biến" ? order = null : homePage.popular === "Bán Chạy" ? order = "sale" : order = "new";
        homePage.price === "none" ? price = null : homePage.price === "increase" ? price = "asc" : price = "desc";
        homePage.menu === 0 ? collect = null : collect = homePage.menu;


        let byOrder = order === null ? "" : `byOrder=${order}`;
        let byPrice = price === null ? "" : `&byPrice=${price}`;
        let byCollection = collect === null ? "" : `&byCollection=${collect}`;



        navigate(`/home/${page}/sort?${byOrder}${byPrice}${byCollection}`);
    }, [homePage, page, navigate])

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
                                <div onClick={() => handleMenu(0)} className={cx("mobie-menu-item")}>TẤT CẢ SẢN PHẨM</div>
                                <div onClick={() => handleMenu(1)} className={cx("mobie-menu-item")}>Sale Shock </div>
                                <div onClick={() => handleMenu(2)} className={cx("mobie-menu-item")}>Hàng Mới Về </div>
                                <div onClick={() => handleMenu(3)} className={cx("mobie-menu-item")}>Áo Croptop Ba Lỗ </div>
                                <div onClick={() => handleMenu(4)} className={cx("mobie-menu-item")}>Áo Croptop Có Tay</div>
                            </div>
                        </div>


                        <Row className={cx("sub-list")}>
                            <Col lg={2} className={cx("sub-list-item", "active")} >Dạo</Col>
                            <Col lg={2} onClick={() => handleMenu(0)} className={cx("sub-list-item",)} >TẤT CẢ SẢN PHẨM</Col>
                            <Col lg={2} onClick={() => handleMenu(1)} className={cx("sub-list-item",)} >Sale Shock</Col>
                            <Col lg={2} onClick={() => handleMenu(2)} className={cx("sub-list-item",)} >Hàng Mới Về</Col>
                            <Col lg={2} onClick={() => handleMenu(3)} className={cx("sub-list-item",)} >Áo Croptop Ba Lỗ</Col>
                            <Col lg={2} onClick={() => handleMenu(4)} className={cx("sub-list-item",)} >Áo Croptop Có Tay</Col>
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
                            <HideListMenu handleMenu={handleMenu} />
                        </div>

                    </Col>
                </Row>


            </Container>

        </div>

    </>);
}

export default memo(SubMenu);
import ClassName from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faAngleDown, faCaretRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProductCatalogue.module.scss";
import ProductItem from "../ProductOffer/ProductItem";
import MenuProduct from "./MenuProduct";


const cx = ClassName.bind(styles);


function ProductCatalogue() {
    return (<div className={cx("wrapper")}>
        <Container className={cx("px-0")}>
            <Row >
                <Col lg={2}  >
                    <div className={cx("menu-bar")}>
                        <FontAwesomeIcon icon={faList} style={{ color: "#000000", }} />
                        <p> Danh Mục </p>
                        <MenuProduct />
                    </div>
                </Col>
                <Col lg={10} md={12} >
                    <Container >
                        <Row className={cx("short-bar")} >
                            <Col className={cx("soft-by")}>
                                <p > Sắp Xếp Theo </p>
                            </Col>
                            <Col xs={9} md={9} lg="auto" className={cx("bar-soft")}>
                                <div className={cx("butn butn-normal butn-primary")}>Phổ Biến</div>
                                <div className={cx("butn butn-normal butn-white")}>Mới Nhất</div>
                                <div className={cx("butn butn-normal butn-white")}>Bán Chạy</div>
                                <div className={cx("price", "butn butn-lg butn-white")}>
                                    <span > Giá</span>
                                    <FontAwesomeIcon icon={faAngleDown}
                                        style={{ color: "#555", display: "block", marginRight: "10px" }} />
                                    <div className={cx("soft-price")}>
                                        <div className={cx("soft-price-item")}>
                                            Giá : Thấp Đến Cao
                                        </div>
                                        <div className={cx("soft-price-item")}>
                                            Giá : Cao Đến thấp
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <div xs={3} md={3} className={cx("controller")}>

                                <div className={cx("controller-state")}>
                                    <span>1</span>
                                    <span>/</span>
                                    <span>7</span>
                                </div>
                                <button className={cx("btn-controller")}>
                                    <FontAwesomeIcon icon={faAngleLeft} style={{ color: "#ccc" }} />
                                </button>
                                <button className={cx("btn-controller", "active")}>
                                    <FontAwesomeIcon icon={faAngleRight} style={{ color: "#ccc" }} />
                                </button>
                            </div>

                        </Row>

                    </Container>
                </Col>
            </Row>
            <Row >
                <Col lg={2} className="px-0" >
                    <div className={cx("list-menu")}>
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
                </Col>
                <Col lg={10} md={12} >
                    <Container className={cx("px-0")}>
                        <Row className={cx("g-3")}>
                            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                                <ProductItem />
                            </Col>
                            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                                <ProductItem />
                            </Col>
                            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                                <ProductItem />
                            </Col>
                            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                                <ProductItem />
                            </Col>
                            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                                <ProductItem />
                            </Col>
                            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                                <ProductItem />
                            </Col>
                            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                                <ProductItem />
                            </Col>
                            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                                <ProductItem />
                            </Col>
                            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                                <ProductItem />
                            </Col>
                            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                                <ProductItem />
                            </Col>

                        </Row>

                        <Row >
                            <div className={cx("product-paginal")}>
                                <button className={cx("pre-paginal")}>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                                <button className={cx("number-paginal", "active")}>1</button>
                                <button className={cx("number-paginal")}>2</button>
                                <button className={cx("number-paginal")}>3</button>
                                <button className={cx("number-paginal")}>4</button>
                                <button className={cx("number-paginal")}>5</button>
                                <button className={cx("number-paginal")}>...</button>
                                <button className={cx("number-paginal")}>14</button>

                                <button className={cx("next-paginal")}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            </div>
                        </Row>
                    </Container>

                </Col>
            </Row>


        </Container>
    </div>);
}

export default ProductCatalogue;
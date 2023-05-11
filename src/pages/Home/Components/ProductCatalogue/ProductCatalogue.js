import ClassName from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";

import { useState, useEffect, memo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faAngleDown, faCaretRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductCatalogue.module.scss";

import MenuProduct from "./MenuProduct";
import useHomePage from "~/hooks/useHomPage";

import { useGetProductsQuery } from "~/features/products/productsApiSlice";
import SubPages from "./SubPages/SubPages";
import NotFound from "./SubPages/NotFound";



const cx = ClassName.bind(styles);


function ProductCatalogue() {
    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductsQuery('productsList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    if (isSuccess) {

        const { ids } = products;
        console.log(ids);

    }

    const { page } = useParams();
    const [homePage, setHomePage] = useHomePage()
    const navigate = useNavigate()
    const pages = [0, 1, 2, 3, 4];
    const listSort = ["Phổ Biến", "Bán Chạy", "Mới Nhất"];
    const [isNotFound, setIsNotFound] = useState(false);
    const [menu, setMenu] = useState(homePage.menu);

    const [smallOrder, setSmallOrder] = useState(Number(page));
    const [sort, setSort] = useState({
        popular: homePage.popular,
        price: homePage.price,
    })


    let menuPages;


    if (pages.length === 5) {
        menuPages = [0, 1, 2, 3, 4]
    }









    const listMenu = [
        "Sản Phẩm", "Sale Shock", "Hàng Mới Về", "Áo Croptop Ba Lỗ", "Áo Croptop Có Tay",
        "Váy Hot Trend", "Sét Đồ Hot Trend", "Quần Đùi - Short",
        "Quần Dài Hot Trend", "Áo Bra-Quần Lót Nữ", "Quần"
    ];
    const [sortBy, setSortBy] = useState({
        byOrder: null,
        byPrice: null,
        byCollection: null
    })


    useEffect(() => {
        setHomePage(homePage => {
            return {
                ...homePage, popular: sort.popular, price: sort.price, menu: menu
            }
        })
        let order, price, collect;
        sort.popular === "Phổ Biến" ? order = null : sort.popular === "Bán Chạy" ? order = "new" : order = "sale";
        sort.price === "none" ? price = null : sort.price === "increase" ? price = "asc" : price = "desc";
        menu === 0 ? collect = null : collect = menu;


        setSortBy(sortBy => {
            return { ...sortBy, byOrder: order, byPrice: price, byCollection: collect }
        })
        // eslint-disable-next-line
    }, [sort, menu])



    useEffect(() => {

        if (page > (pages.length - 1).toString()) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }
        // eslint-disable-next-line
    }, [page])


    useEffect(() => {
        let byOrder = sortBy.byOrder === null ? "" : `byOrder=${sortBy.byOrder}`
        let byPrice = sortBy.byPrice === null ? "" : `&byPrice=${sortBy.byPrice}`
        let byCollection = sortBy.byCollection === null ? "" : `&byCollection=${sortBy.byCollection}`



        navigate(`/home/${smallOrder}/sort?${byOrder}${byPrice}${byCollection}`)
        // eslint-disable-next-line
    }, [smallOrder, sortBy])







    const handlerPreBtn = () => {
        let Order;

        if (smallOrder === 0) {


            Order = pages.length - 1;

        } else if (!smallOrder) {
            Order = pages.length - 1;
        } else if (smallOrder > pages.length - 1) {
            Order = pages.length - 1

        } else {


            Order = smallOrder => --smallOrder;

        }
        return setSmallOrder(Order)


    }
    const handlerNextBtn = () => {
        let Order

        if (smallOrder === (pages.length - 1)) {
            Order = 0
        } else if (smallOrder > pages.length - 1) {
            Order = 0

        } else if (!smallOrder && smallOrder !== 0) {
            Order = pages.length - 1

        } else {
            Order = smallOrder => ++smallOrder
        }

        return setSmallOrder(Order)

    }

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
                                {
                                    listSort.map(item => {
                                        return <div
                                            key={item}
                                            onClick={() => {
                                                setSort((sort) => {
                                                    return { ...sort, popular: item }
                                                })
                                            }}
                                            className={cx("butn butn-normal",
                                                item === sort.popular ? "butn-primary" : "butn-white")}
                                        >

                                            {item}
                                        </div>
                                    })
                                }

                                <div className={cx("price", "butn butn-lg butn-white")}>
                                    <span > Giá</span>
                                    <FontAwesomeIcon icon={faAngleDown}
                                        style={{ color: "#555", display: "block", marginRight: "10px" }} />
                                    <div className={cx("soft-price")}>
                                        <div onClick={(e) => {
                                            e.stopPropagation()
                                            setSort((sort) => {
                                                return { ...sort, price: "none" }
                                            })
                                        }}
                                            className={cx("soft-price-item")}
                                        >
                                            Giá : Mặc Định
                                        </div>
                                        <div onClick={(e) => {
                                            e.stopPropagation()
                                            setSort((sort) => {
                                                return { ...sort, price: "increase" }
                                            })
                                        }}
                                            className={cx("soft-price-item")}
                                        >
                                            Giá : Thấp Đến Cao
                                        </div>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setSort((sort) => {
                                                    return { ...sort, price: "decrease" }
                                                })
                                            }}
                                            className={cx("soft-price-item")}
                                        >
                                            Giá : Cao Đến thấp
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <div xs={3} md={3} className={cx("controller")}>

                                <div className={cx("controller-state")}>
                                    <span>{smallOrder + 1 ? smallOrder + 1 : `#`}</span>
                                    <span>/</span>
                                    <span>{pages.length}</span>
                                </div>
                                <button
                                    onClick={handlerPreBtn}

                                    className={cx("btn-controller", "active")}
                                >
                                    <FontAwesomeIcon icon={faAngleLeft} style={{ color: "#ccc" }} />
                                </button>
                                <button
                                    onClick={handlerNextBtn}

                                    className={cx("btn-controller", "active")}>
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
                        {
                            listMenu.map((item, index) => {
                                return <div key={item} className={cx("menu-item", index === menu ? "active" : "")}
                                    onClick={() => setMenu(index)}>
                                    <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
                                    <span>{item}</span>
                                </div>
                            })
                        }
                    </div>
                </Col>
                <Col lg={10} md={12} >
                    {isNotFound ? <NotFound /> : pages.map(item => {
                        let isTrue = item.toString() === page
                        console.log(typeof item)
                        console.log(isTrue)

                        return <SubPages
                            key={"subpage" + item}
                            page={item}
                            isTrue={isTrue}
                            sort={sort}
                        />
                    })}
                </Col>
            </Row>
            <Row >
                <div className={cx("product-paginal")}>
                    <button className={cx("pre-paginal")} onClick={handlerPreBtn}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    {menuPages.map(item => {
                        let isActive = item.toString() === page;
                        console.log(isActive);
                        let numberOfPages = item + 1
                        return <button
                            key={numberOfPages}
                            className={cx("number-paginal", isActive ? "active" : "")}
                            onClick={() => { setSmallOrder(item) }}
                        >{numberOfPages}
                        </button>

                    })}

                    {/* <button className={cx("number-paginal", "active")}>1</button>
                    <button className={cx("number-paginal")}>2</button>
                    <button className={cx("number-paginal")}>3</button>
                    <button className={cx("number-paginal")}>4</button>
                    <button className={cx("number-paginal")}>5</button>
                    <button className={cx("number-paginal")}>...</button>
                    <button className={cx("number-paginal")}>14</button> */}

                    <button className={cx("next-paginal")} onClick={handlerNextBtn}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </Row>
        </Container>
    </div>);
}

export default memo(ProductCatalogue);
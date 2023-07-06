import ClassName from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import { useState, useEffect, memo, Fragment } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList, faAngleDown, faCaretRight, faAngleLeft, faAngleRight, faSpinner, faFilter,
    faArrowUpWideShort, faArrowDownWideShort

} from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate, } from "react-router-dom";
import styles from "./ProductCatalogue.module.scss";

import MenuProduct from "./MenuProduct";
import useHomePage from "~/hooks/useHomPage";

import { useGetSearchProductsQuery } from "~/features/products/productsApiSlice";
import SubPages from "./SubPages/SubPages";
import NotFound from "./SubPages/NotFound";






const cx = ClassName.bind(styles);


function ProductCatalogue() {

    const { page } = useParams();


    const [homePage, setHomePage] = useHomePage()
    const navigate = useNavigate()

    const listSort = ["Phổ Biến", "Bán Chạy", "Mới Nhất"];


    const [menu, setMenu] = useState(homePage.menu);
    const [query, setQuery] = useState({
        page: 0, collection: 0, order: null, price: null
    })
    const [sort, setSort] = useState({
        popular: homePage.popular,
        price: homePage.price,
    });
    const [smallOrder, setSmallOrder] = useState(Number(page));
    const { data: products, isLoading, isSuccess, refetch } = useGetSearchProductsQuery(query, {
        pollingInterval: 60000,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        forceRefetch: true
    });
    let totalPages;
    let pages = [];
    if (isSuccess) {

        totalPages = JSON.parse(localStorage.getItem("total_pages"));
        for (var i = 0; i < totalPages; i++) {
            pages.push(i);
        };
    }
    useEffect(() => {
        setQuery(pre => {
            return { ...pre, page: Number(page), collection: homePage.menu, order: homePage.popular, price: homePage.price, }
        })


        // eslint-disable-next-line
    }, [page, homePage]);

    const [paginal, setPaginal] = useState(JSON.parse(localStorage.getItem('set_paginal')) || [
        0, 1, 2, 3, 4, pages.length - 1
    ]);
    const [btnPoint, seBtnPoint] = useState({
        first: false,
        last: true
    });


    useEffect(() => {
        const aTag = document.createElement("a");
        aTag.href = "#product-list";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }, [homePage, navigate])
    useEffect(() => {
        const aTag = document.createElement("a");
        aTag.href = "#product-list";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }, [smallOrder])

    //     <script>
    //     document.addEventListener("DOMContentLoaded", function (event) {
    //       var scrollpos = localStorage.getItem('scrollpos');
    //       if (scrollpos) window.scrollTo(0, scrollpos);
    //     });

    //     window.onbeforeunload = function (e) {
    //       localStorage.setItem('scrollpos', window.scrollY);
    //     };
    //   </script>

    let content;
    if (pages.length <= 5) {
        content = pages.map(item => {
            let isActive = item.toString() === page;
            let numberOfPages = item + 1;
            return <button
                key={numberOfPages + "paginal"}
                className={cx("number-paginal", isActive ? "active" : "")}
                onClick={() => { setSmallOrder(item) }}
            >{numberOfPages}
            </button>
        })
    }
    else {
        content = pages.map(item => {
            let isActive = item.toString() === page;
            let numberOfPages = item + 1;

            let isVisible = paginal.includes(item);
            if (item === 1) {
                return <Fragment key={"first"} >
                    <button
                        key={numberOfPages + "first"}
                        className={cx("number-paginal", isActive ? "active" : "", isVisible ? "" : "hidden")}
                        onClick={() => { setSmallOrder(item) }}
                    >{numberOfPages}
                    </button>
                    <button
                        key={numberOfPages + "..."}
                        className={cx("number-paginal", btnPoint.first ? "" : "hidden")}

                    >{"..."}
                    </button>
                </Fragment>
            } else if (item === pages.length - 2) {
                return <Fragment key={"last"}>

                    <button
                        key={numberOfPages + "..."}
                        className={cx("number-paginal", btnPoint.last ? "" : "hidden")}

                    >{"..."}
                    </button>
                    <button
                        key={numberOfPages + "last"}
                        className={cx("number-paginal", isActive ? "active" : "", isVisible ? "" : "hidden")}
                        onClick={() => { setSmallOrder(item) }}
                    >{numberOfPages}
                    </button>
                </Fragment>
            } else {
                return <button
                    key={numberOfPages}
                    className={cx("number-paginal", isActive ? "active" : "", isVisible ? "" : "hidden")}
                    onClick={() => { setSmallOrder(item) }}
                >{numberOfPages}
                </button>
            }
        })


    };












    const listMenu = [
        "Sản Phẩm", "Sale Shock", "Hàng Mới Về", "Áo Croptop Ba Lỗ", "Áo Croptop Có Tay",
        "Váy Hot Trend", "Sét Đồ Hot Trend", "Quần Đùi - Short",
        "Quần Dài Hot Trend", "Áo Bra-Quần Lót Nữ", "Quần"
    ];
    const [sortBy, setSortBy] = useState({
        byOrder: null,
        byPrice: null,
        byCollection: null
    });
    useEffect(() => {
        setMenu(homePage.menu);
        let order, price, collect;
        homePage.popular === "Phổ Biến" ? order = null : homePage.popular === "Bán Chạy" ? order = "sale" : order = "new";
        homePage.price === "none" ? price = null : homePage.price === "increase" ? price = "asc" : price = "desc";
        homePage.menu === 0 ? collect = null : collect = homePage.menu;


        setSortBy(sortBy => {
            return { ...sortBy, byOrder: order, byPrice: price, byCollection: collect }
        })

    }, [homePage])

    useEffect(() => {
        setHomePage(homePage => {
            return {
                ...homePage, popular: sort.popular, price: sort.price, menu: menu
            }
        })

        // eslint-disable-next-line
    }, [sort, menu]);

    useEffect(() => {
        if (smallOrder < 0 || !smallOrder) {
            setSmallOrder(0)
        }
    }, [pages])

    useEffect(() => {

        // eslint-disable-next-line
        let pa = Number(page)
        let numpage = pages.length - 1
        let orderpages = [0, 1, pa, pa + 1, numpage];
        let pageArray = Array.from(new Set(orderpages))
        localStorage.setItem("set_paginal", JSON.stringify(pageArray));
        setPaginal(pageArray);

        if (pa >= 3 && pa < numpage - 2) {
            seBtnPoint(pre => {
                return {
                    ...pre, first: true
                }
            })
        } else if (pa >= numpage - 1) {
            seBtnPoint(pre => {
                return {
                    ...pre, first: true, last: false
                }
            })
        } else {
            seBtnPoint(pre => {
                return {
                    ...pre, first: false, last: true
                }
            })
        }


        // eslint-disable-next-line
    }, [page, smallOrder]);


    useEffect(() => {

        let byOrder = sortBy.byOrder === null ? "" : `byOrder=${sortBy.byOrder}`;
        let byPrice = sortBy.byPrice === null ? "" : `&byPrice=${sortBy.byPrice}`;
        let byCollection = sortBy.byCollection === null ? "" : `&byCollection=${sortBy.byCollection}`;



        navigate(`/home/${smallOrder}/sort?${byOrder}${byPrice}${byCollection}`);
        // eslint-disable-next-line
    }, [smallOrder, sortBy]);







    const handlerPreBtn = () => {
        let Order;

        if (smallOrder === 0) {


            Order = pages.length - 1;

        } else if (!smallOrder) {
            Order = pages.length - 1;
        } else if (smallOrder < 0) {
            Order = 0

        } else if (setSmallOrder > pages.length - 1) {
            Order = pages.length - 1
        } else {


            Order = smallOrder => --smallOrder;

        }

        setSmallOrder(Order)



    }
    const handlerNextBtn = () => {
        let Order

        if (smallOrder === (pages.length - 1)) {
            Order = 0
        } else if (smallOrder > pages.length - 1) {
            Order = pages.length - 1

        } else if (!smallOrder && smallOrder !== 0) {
            Order = pages.length - 1

        } else {
            Order = smallOrder => ++smallOrder
        }

        setSmallOrder(Order)


    }

    return (<div className={cx("wrapper")} id="product-list">
        <Container className={cx("px-0")}>
            <Row >
                <Col lg={2}  >
                    <div className={cx("menu-bar")}>
                        <FontAwesomeIcon icon={faList} style={{ color: "#000000", }} />
                        <p> Danh Mục </p>
                        <MenuProduct menu={menu} setMenu={setMenu} />
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
                                            key={item + "sort"}
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
                                    <span className={cx("tablet")} >{
                                        sort.price === "none" ? "Giá : Mặc Định" : sort.price === "increase" ? "Giá : Thấp Đến Cao" : "Giá : Cao Đến thấp"
                                    }</span>
                                    <span className={cx("mobile")}>
                                        {sort.price === "none" ? <FontAwesomeIcon icon={faFilter} size="sm" /> :
                                            sort.price === "increase" ? <FontAwesomeIcon icon={faArrowUpWideShort} size="sm" /> :
                                                <FontAwesomeIcon icon={faArrowDownWideShort} size="sm" />
                                        }

                                    </span>

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

                                <div className={cx("controller-state", "animate__animated animate__fadeIn")}>
                                    <span >{smallOrder + 1 ? smallOrder + 1 : 1}</span>
                                    <span>/</span>
                                    <span className={cx("animate__animated animate__fadeIn  animate__delay-2s")} >
                                        {isLoading && < FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                                        {isSuccess && pages.length}
                                    </span>
                                </div>
                                <button
                                    onClick={handlerPreBtn}

                                    className={cx("btn-controller", "active")}
                                >
                                    <FontAwesomeIcon icon={faAngleLeft} style={{ color: "#ccc" }} />
                                </button>
                                <button
                                    onClick={handlerNextBtn}

                                    className={cx("btn-controller", "active")}


                                >

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
                                return <div key={item} className={cx("menu-item", index === homePage.menu ? "active" : "")}
                                    onClick={() => {
                                        setMenu(index)
                                        refetch()
                                    }}>
                                    <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
                                    <span>{item}</span>
                                </div>
                            })
                        }
                    </div>
                </Col>
                <Col lg={10} md={12} className={cx("product-list")} >
                    {smallOrder > pages.length ? <NotFound /> : pages.map(item => {
                        let isTrue = item.toString() === page


                        return isSuccess ? <SubPages
                            key={"subpage" + item}
                            isTrue={isTrue}
                            isLoading={isLoading}
                            isSuccess={isSuccess}
                            products={products}

                        /> : null
                    })}
                </Col>
            </Row>
            <Row >

                <Col lg={{ span: 10, offset: 2 }} md={12} className={cx("product-paginal-wrapper")}>
                    <div className={cx("product-paginal")}>
                        <button className={cx("pre-paginal")} onClick={handlerPreBtn}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <div className={cx("content")}>

                            {content}
                        </div>

                        <button className={cx("next-paginal")} onClick={handlerNextBtn}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </Col>

            </Row>
        </Container>
    </div>);
}

export default memo(ProductCatalogue);
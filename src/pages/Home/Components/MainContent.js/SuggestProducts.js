import className from "classnames/bind";


import { Container, Row, Col } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./MainContent.module.scss";
import { useGetProductsQuery } from "~/features/products/productsApiSlice";
import ProductItem from "../ProductOffer/ProductItem";

const cx = className.bind(styles);

function SuggestProducts() {
    const { page } = useParams()
    const navigate = useNavigate()
    const { data: products, isLoading, isSuccess } = useGetProductsQuery("productsList", {
        pollingInterval: 60000,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    const [pageNumber, setPageNumber] = useState(Number(page))
    let result = []
    if (isSuccess) {
        for (const x of Object.values(products.entities)) {
            result.push(x)
        }

    }
    let term = Math.ceil(result.length / 12);
    let pages = []
    for (let i = 0; i < term; i++) {
        pages.push(i)
    };
    const productPage = result.slice(12 * Number(page), (12 * Number(page) + 12));
    useEffect(() => {

        navigate(`/home/suggest/${pageNumber}`)
    }, [pageNumber, navigate])

    useEffect(() => {
        const aTag = document.createElement("a");
        aTag.href = "#list-products";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }, [pageNumber])
    const [paginal, setPaginal] = useState(JSON.parse(localStorage.getItem('set_pagination')) || [
        0, 1, 2, 3, 4, pages.length - 1
    ]);
    const [btnPoint, seBtnPoint] = useState({
        first: false,
        last: true
    });
    let content;
    if (pages.length <= 5) {
        content = pages.map(item => {
            let isActive = item.toString() === page;
            let numberOfPages = item + 1;
            return <button
                key={numberOfPages + "paginal"}
                className={cx("number-paginal", isActive ? "active" : "")}
                onClick={() => { setPageNumber(item) }}
            >{numberOfPages}
            </button>
        })
    } else {
        content = pages.map(item => {
            let isActive = item.toString() === page;
            let numberOfPages = item + 1;

            let isVisible = paginal.includes(item);
            if (item === 1) {
                return <Fragment key={"first"} >
                    <button
                        key={numberOfPages + "first"}
                        className={cx("number-paginal", isActive ? "active" : "", isVisible ? "" : "hidden")}
                        onClick={() => { setPageNumber(item) }}
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
                        onClick={() => { setPageNumber(item) }}
                    >{numberOfPages}
                    </button>
                </Fragment>
            } else {
                return <button
                    key={numberOfPages}
                    className={cx("number-paginal", isActive ? "active" : "", isVisible ? "" : "hidden")}
                    onClick={() => { setPageNumber(item) }}
                >{numberOfPages}
                </button>
            }
        })


    };

    useEffect(() => {

        let pa = Number(page)
        let numpage = pages.length - 1
        let orderpages = [0, 1, pa, pa + 1, numpage];
        let pageArray = Array.from(new Set(orderpages))
        localStorage.setItem("set_pagination", JSON.stringify(pageArray));
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
    }, [page, pageNumber]);

    const handlerPreBtn = (e) => {
        let Order;

        if (pageNumber === 0) {


            Order = pages.length - 1;

        } else if (!pageNumber) {
            Order = pages.length - 1;
        } else if (pageNumber < 0) {
            Order = 0

        } else if (pageNumber > pages.length - 1) {
            Order = pages.length - 1
        } else {


            Order = pageNumber => --pageNumber;

        }

        setPageNumber(Order)
    }
    const handlerNextBtn = (e) => {
        let Order

        if (pageNumber === (pages.length - 1)) {
            Order = 0
        } else if (pageNumber > pages.length - 1) {
            Order = pages.length - 1

        } else if (!pageNumber && pageNumber !== 0) {
            Order = pages.length - 1

        } else {
            Order = pageNumber => ++pageNumber
        }

        setPageNumber(Order)
    }

    return (<div className={cx("suggest-products")} id="list-products">
        <Container >
            <div className={cx("suggest-header")}>
                <h1 className={cx("suggest-title")}>Gợi Ý Cho Bạn</h1>
                <hr />
            </div>
            <Container className={cx("px-0 pt-5")} >
                {isLoading && <h2>Loading</h2>}
                {isSuccess && pages.map(item => {
                    return <Row key={item + "row"} className={cx("g-3 pb-5", item === pageNumber ? "" : "d-none")}>
                        {productPage.map(product => {
                            return (<Col xl={2} lg={3} md={4} sm={6} xs={12} key={product.id}>
                                <ProductItem product={product} key={product.createdAt} />
                            </Col>)
                        })}
                    </Row>
                })}

                <Col lg={{ span: 8, offset: 2 }} md={12} className={cx("product-paginal-wrapper")}>
                    <div className={cx("product-paginal")}>
                        <button className={cx("pre-paginal", "d-inline")} onClick={handlerPreBtn}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <div className={cx("content")}>

                            {content}
                        </div>

                        <button className={cx("next-paginal", "d-inline")} onClick={handlerNextBtn}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </Col>

            </Container>
        </Container>

    </div>);
}

export default SuggestProducts;
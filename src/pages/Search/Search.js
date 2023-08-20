
import className from 'classnames/bind';
import { Container, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom"
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft, faAngleRight, faFilter, faArrowUpWideShort, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";

import styles from './Search.module.scss';
import { selectProducts, selectSortBy, selectKeyword, setSortBy, } from '~/features/search/searchSlice';


import { useGetCatagoryQuery } from "~/features/Catagory/catagoryApiSlice";
import { useGetSearchMutation } from "~/features/products/productsApiSlice";
import { useGetDetailsQuery } from "~/features/productDetails/productDetailSlice"
import SearchBy from './SearchBy';
import RangePrice from './RangePrice';
import ProductList from "./ProductList";
import ByRating from "./ByRating";

const cx = className.bind(styles);

function Search() {
    const { pathname } = useLocation();
    useEffect(() => {
        localStorage.setItem("shop-Page", JSON.stringify(pathname));
        // eslint-disable-next-line 
    }, [])
    const { data: detailsProduct, isSuccess: isDetailsSuccess } = useGetDetailsQuery("listDetails", {
        pollingInterval: 60000,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const sortBy = useSelector(selectSortBy);
    const KeyWords = useSelector(selectKeyword)

    const [searchMore] = useState(JSON.parse(localStorage.getItem("search-more")) || {})

    const [menu, setMenu] = useState(searchMore.menu);
    const [place, setPlace] = useState(searchMore.place);
    const [deliver, setDeliver] = useState(searchMore.deliver);
    const [rangePrice, setRangePrice] = useState(searchMore.rangePrice);
    const [voucher, setVoucher] = useState(searchMore.voucher);
    const [rate, SetRate] = useState(searchMore.rate);



    const { page: numberOfPages } = useParams();


    const [search, { isSuccess: isSearchSuccess, isLoading: isSearchLoading }] = useGetSearchMutation();


    const navigate = useNavigate()







    const listSort = ["Liên Quan", "Bán Chạy", "Mới Nhất"];
    const [sort, setSort] = useState({
        popular: sortBy.popular,
        price: sortBy.price
    });

    useEffect(() => {
        dispatch(setSortBy(sort))

        //eslint-disable-next-line
    }, [sort]);
    // eslint-disable-next-line
    useEffect(() => {
        const term = JSON.parse(localStorage.getItem('search-keywords'))
        const query = {
            ...term,
            menu,
            place,
            deliver,
            rangePrice,
            voucher,
            rate
        }
        search(query);

        if (isSearchSuccess) {
            localStorage.setItem("search-more", JSON.stringify({
                menu,
                place,
                deliver,
                rangePrice,
                voucher,
                rate

            }))
            navigate(`/${Number(numberOfPages)}/search?keyword=${query.keyword}&details=${query.details}`);
        }


        // eslint-disable-next-line 
    }, [menu, place, deliver, rangePrice, voucher, rate])


    useEffect(() => {
        const refreshSearch = async () => {
            let term = JSON.parse(localStorage.getItem('search-keywords'));


            const query = {
                keyword: term.keyword,
                details: term.details,
                more: {
                    popular: sort.popular,
                    price: sort.price
                },
                ...searchMore
            }
            await search(query);

            navigate(`/${Number(numberOfPages)}/search?keyword=${query.keyword}&details=${query.details}`);
        }

        refreshSearch();

        // eslint-disable-next-line
    }, []);




    const [totalProducts, setTotalProducts] = useState(products);

    const { data: catagory,
        isSuccess: isCatagorySuccess,
    } = useGetCatagoryQuery()

    let listMenu;
    if (isCatagorySuccess) {

        let details = []
        for (let x of Object.values(catagory.entities)) {
            details.push({
                details: x.details,
                listProduct: x.listProduct.length || 0
            })
        }

        listMenu = details
    }

    let listComeFrom;
    if (isDetailsSuccess) {
        let places = [];
        for (let x of Object.values(detailsProduct.entities)) {
            places.push(x.comefrom)
        }
        const term = Array.from(new Set(places))


        listComeFrom = term.map(item => {
            return { details: item }
        });
    }


    useEffect(() => {
        setTotalProducts(Array.from(products) || [])
    }, [products])





    const [page, setPage] = useState(Number(numberOfPages));
    const totalPages = Math.ceil(totalProducts?.length / 12) || 0;
    const pageProducts = totalProducts?.slice(12 * page, (12 * page + 12));

    let pages = []
    for (let i = 0; i < totalPages; i++) {
        pages.push(i)
    };
    useEffect(() => {
        navigate(`/${page}/search?keyword=${KeyWords.keyword}&details=${KeyWords.details}`);
        // eslint-disable-next-line
    }, [page])

    const [paginal, setPaginal] = useState(JSON.parse(localStorage.getItem('set_SearchPages')) || [
        0, 1, 2, 3, 4, pages.length - 1
    ]);
    const [btnPoint, seBtnPoint] = useState({
        first: false,
        last: true
    });

    let content;
    if (pages.length <= 5) {
        content = pages.map(item => {
            let isActive = item.toString() === numberOfPages;
            let numberOfPage = item + 1;
            return <button
                key={numberOfPage + "paginal"}
                className={cx("number-paginal", isActive ? "active" : "")}
                onClick={() => { setPage(item) }}
            >{numberOfPage}
            </button>
        })
    } else {
        content = pages.map(item => {
            let isActive = item.toString() === numberOfPages;
            let numberOfPage = item + 1;

            let isVisible = paginal.includes(item);
            if (item === 1) {
                return <Fragment key={"first"} >
                    <button
                        key={numberOfPage + "first"}
                        className={cx("number-paginal", isActive ? "active" : "", isVisible ? "" : "hidden")}
                        onClick={() => { setPage(item) }}
                    >{numberOfPage}
                    </button>
                    <button
                        key={numberOfPage + "..."}
                        className={cx("number-paginal", btnPoint.first ? "" : "hidden")}

                    >{"..."}
                    </button>
                </Fragment>
            } else if (item === pages.length - 2) {
                return <Fragment key={"last"}>

                    <button
                        key={numberOfPage + "..."}
                        className={cx("number-paginal", btnPoint.last ? "" : "hidden")}

                    >{"..."}
                    </button>
                    <button
                        key={numberOfPage + "last"}
                        className={cx("number-paginal", isActive ? "active" : "", isVisible ? "" : "hidden")}
                        onClick={() => { setPage(item) }}
                    >{numberOfPage}
                    </button>
                </Fragment>
            } else {
                return <button
                    key={numberOfPage}
                    className={cx("number-paginal", isActive ? "active" : "", isVisible ? "" : "hidden")}
                    onClick={() => { setPage(item) }}
                >{numberOfPage}
                </button>
            }
        })


    };
    useEffect(() => {

        let pa = Number(page)
        let numpage = pages.length - 1
        let orderpages = [0, 1, pa, pa + 1, numpage];
        let pageArray = Array.from(new Set(orderpages))
        localStorage.setItem("set_SearchPages", JSON.stringify(pageArray));
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
    }
        // eslint-disable-next-line 
        , [page, numberOfPages])

    useEffect(() => {
        const aTag = document.createElement("a");
        aTag.href = "#search-products";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }, [page])

    const handlerPreBtn = () => {
        let Order;

        if (page === 0) {


            Order = totalPages - 1;

        } else if (!page) {
            Order = totalPages - 1;
        } else if (page < 0) {
            Order = 0

        } else if (page > totalPages - 1) {
            Order = totalPages - 1
        } else {


            Order = page => --page;

        }

        setPage(Order)
    }
    const handlerNextBtn = () => {
        let Order

        if (page === (totalPages - 1)) {
            Order = 0
        } else if (page > totalPages - 1) {
            Order = totalPages - 1;

        } else if (!page && page !== 0) {
            Order = totalPages - 1;

        } else {
            Order = page => ++page;
        }

        setPage(Order);
    }

    return <div className={cx("wrapper")}>
        <Container>
            <Row className={cx("px-0")}>
                <Col lg={2} >
                    <div className={cx("filter-header")}>
                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className={cx("icon")}>
                            <g>
                                <polyline fill="none" points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                                </polyline>
                            </g>
                        </svg>
                        <div className={cx("search-text")}>SẮP XẾP THEO</div>
                        <div className={cx("mobile-filter")}>

                            <SearchBy menu={menu} title={"Theo Danh Mục"} setMenu={setMenu} content={listMenu} />
                            <SearchBy menu={place} title={"Nơi Bán"} setMenu={setPlace} content={listComeFrom} />
                            <SearchBy menu={deliver} title={"Đơn Vị Vận Chuyển"} setMenu={setDeliver} content={[{ details: "Hỏa Tốc" }, { details: "Nhanh" }, { details: "Tiết Kiệm" }]} />
                            <RangePrice menu={rangePrice} title={"Khoảng Giá"} setMenu={setRangePrice} />
                            <ByRating menu={rate} title={"Đánh Giá"} setMenu={SetRate} />
                            <SearchBy
                                title={"Dịch Vụ & Khuyến Mãi"}
                                menu={voucher}
                                setMenu={setVoucher}
                                content={[{ details: "Voucher Xtra" }, { details: "Đang Giảm Giá" }, { details: "Gì Cũng Rẻ" }, { details: "Hàng Có Sẵn" }, { details: "Mua giá bán buôn/ bán sỉ" }]}
                            />


                        </div>
                    </div>
                    <div className={cx('search-by-wrapper')}>

                        <SearchBy title={"Theo Danh Mục"} menu={menu} setMenu={setMenu} content={listMenu} />
                        <SearchBy title={"Nơi Bán"} menu={place} setMenu={setPlace} content={listComeFrom} />
                        <SearchBy title={"Đơn Vị Vận Chuyển"} menu={deliver} setMenu={setDeliver} content={[{ details: "Hỏa Tốc" }, { details: "Nhanh" }, { details: "Tiết Kiệm" }]} />
                        <RangePrice title={"Khoảng Giá"} menu={rangePrice} setMenu={setRangePrice} />
                        <ByRating menu={rate} title={"Đánh Giá"} setMenu={SetRate} />

                        <SearchBy
                            title={"Dịch Vụ & Khuyến Mãi"}
                            menu={voucher}
                            setMenu={setVoucher}
                            content={[{ details: "Voucher Xtra" }, { details: "Đang Giảm Giá" }, { details: "Gì Cũng Rẻ" }, { details: "Hàng Có Sẵn" }, { details: "Mua giá bán buôn/ bán sỉ" }]}
                        />


                    </div>


                </Col>
                <Col lg={10} xs={12} >
                    <Container >
                        <Row>
                            <h1 className={cx("search-header")}>
                                <svg viewBox="0 0 18 24" className={cx("icon-result")}>
                                    <g transform="translate(-355 -149)"><g transform="translate(355 149)">
                                        <g fillRule="nonzero" transform="translate(5.4 19.155556)">
                                            <path d="m1.08489412 1.77777778h5.1879153c.51164401 0 .92641344-.39796911.92641344-.88888889s-.41476943-.88888889-.92641344-.88888889h-5.1879153c-.51164402 0-.92641345.39796911-.92641345.88888889s.41476943.88888889.92641345.88888889z"></path><g transform="translate(1.9 2.666667)"><path d="m .75 1.77777778h2.1c.41421356 0 .75-.39796911.75-.88888889s-.33578644-.88888889-.75-.88888889h-2.1c-.41421356 0-.75.39796911-.75.88888889s.33578644.88888889.75.88888889z">
                                            </path>
                                            </g>
                                        </g>
                                        <path d="m8.1 8.77777718v4.66666782c0 .4295545.40294373.7777772.9.7777772s.9-.3482227.9-.7777772v-4.66666782c0-.42955447-.40294373-.77777718-.9-.77777718s-.9.34822271-.9.77777718z" fillRule="nonzero">
                                        </path>
                                        <path d="m8.1 5.33333333v.88889432c0 .49091978.40294373.88888889.9.88888889s.9-.39796911.9-.88888889v-.88889432c0-.49091977-.40294373-.88888889-.9-.88888889s-.9.39796912-.9.88888889z" fillRule="nonzero">
                                        </path>
                                        <path d="m8.80092773 0c-4.86181776 0-8.80092773 3.97866667-8.80092773 8.88888889 0 1.69422221.47617651 3.26933331 1.295126 4.61333331l2.50316913 3.9768889c.30201078.4782222.84303623.7697778 1.42482388.7697778h7.17785139c.7077799 0 1.3618277-.368 1.7027479-.9617778l2.3252977-4.0213333c.7411308-1.2888889 1.1728395-2.7786667 1.1728395-4.37688891 0-4.91022222-3.9409628-8.88888889-8.80092777-8.88888889m0 1.77777778c3.82979317 0 6.94810087 3.18933333 6.94810087 7.11111111 0 1.24444441-.3168334 2.43022221-.9393833 3.51466671l-2.3252977 4.0213333c-.0166754.0284444-.0481735.0462222-.0833772.0462222h-7.07224026l-2.43461454-3.8648889c-.68184029-1.12-1.04128871-2.4053333-1.04128871-3.71733331 0-3.92177778 3.11645483-7.11111111 6.94810084-7.11111111">
                                        </path>
                                    </g>
                                    </g>
                                </svg>
                                <p>
                                    Kết quả tìm kiếm cho từ khóa
                                    '{` `}
                                    {isSearchSuccess &&
                                        <span style={{ color: '#ee4d2d' }}>
                                            {KeyWords.keyword}
                                        </span>}
                                    {` `}
                                    '


                                </p>



                            </h1>
                        </Row>
                        <Row className={cx("short-bar")} id="search-products" >
                            <Col className={cx("soft-by")}>
                                <p > Sắp Xếp Theo </p>
                            </Col>
                            <Col xs={9} md={9} lg="auto" className={cx("bar-soft")}>
                                {
                                    listSort.map(item => {
                                        return <div
                                            key={item + "sort"}
                                            onClick={async () => {
                                                setSort((sort) => {
                                                    return { ...sort, popular: item }
                                                })
                                                let term = JSON.parse(localStorage.getItem('search-keywords'))
                                                const query = {
                                                    keyword: term.keyword,
                                                    details: term.details,
                                                    more: {
                                                        popular: item,
                                                        price: sort.price
                                                    },
                                                    menu: term?.menu,
                                                    place: term?.place,
                                                    deliver: term?.deliver,
                                                    rangePrice: term?.rangePrice,
                                                    voucher: term?.voucher,
                                                }
                                                await search(query);

                                                navigate(`/${Number(numberOfPages)}/search?keyword=${query.keyword}&details=${query.details}`);
                                            }}
                                            className={cx("butn butn-normal",
                                                item === sort.popular ? "butn-primary" : "butn-white")}
                                        >

                                            {item}
                                        </div>
                                    })
                                }

                                <div className={cx("price", "butn butn-lg butn-white")}>
                                    <span className={cx("tablet")}>{
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
                                        <div onClick={async (e) => {
                                            e.stopPropagation()
                                            setSort((sort) => {
                                                return { ...sort, price: "none" }
                                            })
                                            let term = JSON.parse(localStorage.getItem('search-keywords'))
                                            const query = {
                                                keyword: term.keyword,
                                                details: term.details,
                                                more: {
                                                    popular: "none",
                                                    price: sort.price
                                                },
                                                menu: term?.menu,
                                                place: term?.place,
                                                deliver: term?.deliver,
                                                rangePrice: term?.rangePrice,
                                                voucher: term?.voucher,
                                            }
                                            await search(query);

                                            navigate(`/${Number(numberOfPages)}/search?keyword=${query.keyword}&details=${query.details}`);

                                        }}
                                            className={cx("soft-price-item")}
                                        >
                                            Giá : Mặc Định
                                        </div>
                                        <div onClick={async (e) => {
                                            e.stopPropagation()
                                            setSort((sort) => {
                                                return { ...sort, price: "increase" }
                                            })
                                            let term = JSON.parse(localStorage.getItem('search-keywords'))
                                            const query = {
                                                keyword: term.keyword,
                                                details: term.details,
                                                more: {
                                                    popular: "increase",
                                                    price: sort.price
                                                },
                                                menu: term?.menu,
                                                place: term?.place,
                                                deliver: term?.deliver,
                                                rangePrice: term?.rangePrice,
                                                voucher: term?.voucher,
                                            }
                                            await search(query);

                                            navigate(`/${Number(numberOfPages)}/search?keyword=${query.keyword}&details=${query.details}`);

                                        }}
                                            className={cx("soft-price-item")}
                                        >
                                            Giá : Thấp Đến Cao
                                        </div>
                                        <div
                                            onClick={async (e) => {
                                                e.stopPropagation()
                                                setSort((sort) => {
                                                    return { ...sort, price: "decrease" }
                                                })
                                                let term = JSON.parse(localStorage.getItem('search-keywords'))
                                                const query = {
                                                    keyword: term.keyword,
                                                    details: term.details,
                                                    more: {
                                                        popular: "decrease",
                                                        price: sort.price
                                                    },
                                                    menu: term?.menu,
                                                    place: term?.place,
                                                    deliver: term?.deliver,
                                                    rangePrice: term?.rangePrice,
                                                    voucher: term?.voucher,
                                                }
                                                await search(query);

                                                navigate(`/${Number(numberOfPages)}/search?keyword=${query.keyword}&details=${query.details}`);

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
                                    <span >{page + 1}</span>
                                    <span>/</span>
                                    <span className={cx("animate__animated animate__fadeIn")} >
                                        {totalPages}

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
                        <Row >
                            {
                                totalPages > 0 ?
                                    <ProductList
                                        pageProducts={pageProducts}
                                        isNotFound={page > totalPages - 1 ? true : false}

                                    /> : isSearchLoading ? null :
                                        <h2 className={cx("pt-4")}>Không tìm thấy sản phẩm</h2>
                            }
                            {
                                totalPages > 0 ? <Col lg={{ span: 8, offset: 2 }} md={12} className={cx("product-paginal-wrapper")}>
                                    <div className={cx("product-paginal")}>
                                        <button className={cx("pre-paginal", "d-inline")} onClick={handlerPreBtn}>
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                        </button>
                                        <div className={cx("content")} >

                                            {content}
                                        </div>

                                        <button className={cx("next-paginal", "d-inline")} onClick={handlerNextBtn}>
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </button>
                                    </div>
                                </Col> : null
                            }

                        </Row>

                    </Container>
                </Col>
            </Row>

        </Container>
    </div>
}

export default Search;
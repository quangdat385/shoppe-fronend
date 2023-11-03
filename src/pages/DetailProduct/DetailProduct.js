import className from "classnames/bind";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import styles from "./DetailProduct.module.scss"
import { Container, Col, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke, faAngleDown, faPlus, faMinus, } from "@fortawesome/free-solid-svg-icons";
import guarantee from "~/assets/images/guarantee.png"
import { useGetProductsQuery, useUpdateLikesMutation } from "~/features/products/productsApiSlice";
import { useGetDetailsQuery } from "~/features/productDetails/productDetailSlice"
import NotFound from "~/pages/Home/Components/ProductCatalogue/SubPages/NotFound";
import AboutShop from "~/pages/DetailProduct/AboutShop";
import AboutProduct from "~/pages/DetailProduct/AboutProduct";
import { useGetUsersQuery } from "~/features/users/usersApiSlice";
import { useGetSearchMutation } from "~/features/products/productsApiSlice";
import { usePurchaseProductMutation } from "~/features/UserCart/userCartSlice";
import { formatCurrency } from "~/until/formatNumber";
import useAuth from "~/hooks/useAuth";

const cx = className.bind(styles)



function DetailProduct() {
  const [addToCart] = usePurchaseProductMutation()
  const { pathname } = useLocation();
  useEffect(() => {
    localStorage.setItem("shop-Page", JSON.stringify(pathname));
    // eslint-disable-next-line 
  }, [])
  const [search] = useGetSearchMutation();
  const { title } = useParams();
  const id = title.split(":")[1]
  const { UserId } = useAuth();
  const navigate = useNavigate()
  const [query, setQuery] = useState({ q: false });
  useEffect(() => {
    const aTag = document.createElement("a");
    aTag.href = "#details-product";
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }, [title])



  const { data: products, isLoading: isProductLoading, isSuccess: isProductSuccess } = useGetProductsQuery(query, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    forceRefetch: true
  });
  let product;
  let likes = 0, numberOfRates = 0;

  if (isProductSuccess) {

    const term = Object.values(products.entities);
    product = Array.from(term).filter(item => item.id === id)[0];
    for (const key of Array.from(term)) {

      likes += key.likes;
      numberOfRates += key.total_rate;
    }


  }


  const { data: details, isSuccess, isLoading } = useGetDetailsQuery("listDetail", {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    skip: false,
  }
  );
  const [updateLikes] = useUpdateLikesMutation("productsList");
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[UserId]
    }),
  }
  )


  let detailsProduct
  if (isSuccess) {
    const term = Object.values(details.entities);
    detailsProduct = Array.from(term).filter(item => item.productId === id)[0];

  }

  const handlerAddToCart = async () => {
    const result = await addToCart({
      productId: detailsProduct.productId,
      userId: UserId,
      quantity: quantity,
      status: -1
    });
    if (result) {
      toast.success("Add To Cart Success!", {
        position: 'top-center',
        autoClose: 1000
      });
    }
  }
  const handleBuy = async () => {
    const result = await addToCart({
      productId: detailsProduct.productId,
      userId: UserId,
      quantity: quantity,
      status: -1
    });
    if (result) {
      toast.success("Add To Cart Success!", {
        position: 'top-center',
        autoClose: 1000
      });
      navigate('/user/cart', {
        state: {
          checked: true,
        }
      })
    }
  }
  const lengthImgs = product?.img_product?.length || 9;


  let listImg = []
  for (let i = 0; i < lengthImgs; i++) {
    listImg.push(i)
  }

  const [listView, setListView] = useState(0);

  const [listActive, setListActive] = useState(listImg.slice(listView, listView + 5));
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [like, setLike] = useState(user?.like_product?.includes(product?.id) || false);
  const [numberOfLikes, setNumberOfLikes] = useState(product?.likes);

  useEffect(() => {
    if (like === true) {
      setQuery(pre => {
        return { ...pre, q: true }
      })
    } else {
      setQuery(pre => {
        return { ...pre, q: false }
      })
    }
  }, [like])
  useEffect(() => {
    setNumberOfLikes(product?.likes);
  }, [product])

  useEffect(() => {

    setListActive(listImg.slice(listView, listView + 5))
    // eslint-disable-next-line 
  }, [listView])
  useEffect(() => {
    const updateLike = async () => {
      if (like === true && UserId) {
        await updateLikes({ id: product?.id, userId: UserId, likes: 1 });


      } else if (like === false && UserId) {
        await updateLikes({ id: product?.id, userId: UserId, likes: -1 });


      }
    }

    updateLike()
    // eslint-disable-next-line
  }, [like, UserId])

  const [imgView, setImgView] = useState(0)

  const handelNextButton = () => {
    setListView(pre => {
      console.log(pre)
      if (pre < listImg.length - 5) {
        return pre = ++pre
      } else {
        return pre
      }

    })

  }
  const handelPrevButton = () => {
    setListView(pre => {
      console.log(pre)
      if (pre > 0) {
        return pre = --pre
      } else {
        return pre
      }
    })
  }


  let rating;
  let leftrating;

  let rate = product?.rating;
  if (rate === 0) {

    rating = <FontAwesomeIcon icon={faStar} style={{
      color: "#d5d5d5",
      height: "14px",
    }} />
  } else {
    if (Number.isInteger(rate)) {
      let term = []
      for (let i = 0; i < rate; i++) {
        term.push(i)
      }
      rating = term.map(item => {
        return <FontAwesomeIcon key={"key" + item} icon={faStar} style={{ color: "#ee4d2d", height: "14px" }} />

      })
    } else {

      let int = Math.floor(rate);
      let float = rate - int;
      let term = [];
      for (let i = 0; i < int; i++) {
        term.push(i)
      }
      rating = term.map(item => {
        return <FontAwesomeIcon key={"key" + item} icon={faStar} style={{ color: "#ee4d2d", height: "14px" }} />

      })
      if (float !== 0) {
        if (float > 0.5) {
          leftrating = <i className={cx("icon-after")}>
            <FontAwesomeIcon icon={faStarHalfStroke} style={{ color: "#ee4d2d", backGroundColor: "#fff", height: "14px" }} />
          </i>
        } else if (float < 0.5) {
          leftrating = <i className={cx("icon-before")}>

            <FontAwesomeIcon icon={faStar} style={{ color: "#d5d5d5", height: "14px" }} />
          </i>
        } else {
          leftrating = <FontAwesomeIcon icon={faStarHalfStroke} style={{ color: "#ee4d2d", height: "14px" }} />
        }
      }


    }
  }

  return isLoading || isProductLoading ? <Container>
    <div className={cx("d-flex justify-content-center  align-items-center w-100 h-100")}>
      <h1 className={cx("d-flex")} >Loading...</h1>
    </div>
  </Container> : product && detailsProduct ? <div className={cx("wrapper")} id="details-product">
    <Container className={cx("menu", "px-0 bg-white")}>
      <Link className={cx("link")} to="/home">Shop</Link>
      <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className={cx("menu-icon")}>
        <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
        </path>
      </svg>
      <Link onClick={async () => {
        const query = {
          keyword: product.details, details: true, more: {
            popular: "Liên Quan",
            price: "none"
          }
        }
        await search(query)

        navigate(`/0/search?keyword=${query.keyword}&details=${query.details}`)
      }


      } className={cx("link")}>{product.type_of_product}</Link>
      <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className={cx("menu-icon")}>
        <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
        </path>
      </svg>
      <Link onClick={async () => {
        const query = {
          keyword: product.details, details: true, more: {
            popular: "Liên Quan",
            price: "none"
          }
        }
        await search(query)

        navigate(`/0/search?keyword=${query.keyword}&details=${query.details}`)
      }


      }
        className={cx("link")}>{product.details}</Link>
      <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className={cx("menu-icon")}>
        <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
        </path>
      </svg>
      <div className={cx("menu-title")}>{product.title}</div>
    </Container>
    <Container className={cx('page-product', "px-0 bg-white")}>
      <Row>
        <Col lg={6} xl={5}>
          <div className={cx('img-box')}>
            <div className={cx('img')}>
              <div className={cx('img-background')}  >
                <img src={`${process.env.REACT_APP_API_IMG_URL}/${product?.img_product[imgView][0]}`} alt={"img-product"} />
                <div className={cx('img-overlay')}>
                  <img src={`${process.env.REACT_APP_API_IMG_URL}/${product?.ship_label[0]}`} alt="overlay" />
                </div>
              </div>

            </div>
            <div className={cx('img-slider')}>
              <div className={cx('next-btn')} onClick={handelNextButton}>
                <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className={cx('next-icon')}>
                  <polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11">
                  </polygon>
                </svg>
              </div>
              <div className={cx("pre-btn")} onClick={handelPrevButton}>
                <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className={cx("pre-icon")}>
                  <polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9">
                  </polygon>
                </svg>
              </div>
              {
                listImg.map(item => {
                  let isVisible = listActive.includes(item)
                  return <div
                    onMouseOver={() => { setImgView(item) }}
                    className={cx('slider-item', isVisible ? "" : "d-none")} key={item}>
                    <div className={cx('img')}>
                      <div className={cx('img-background')} >
                        <img src={`${process.env.REACT_APP_API_IMG_URL}/${product?.img_product[item][0]}`} alt={"img-product"} />
                        <div className={cx('img-overlay')}>
                          <img src={`${process.env.REACT_APP_API_IMG_URL}/${product?.ship_label[0]}`} alt="overlay" />
                        </div>
                      </div>

                    </div>
                  </div>
                })
              }

            </div>
            <div className={cx('social-media')} >
              <div className={cx('contact-via')}>
                Chia sẻ :
                <button className={cx('social-icon')} style={{ backgroundPosition: "0 -100%" }}>

                </button>
                <button className={cx('social-icon')} style={{ backgroundPosition: "0 -300%" }}>

                </button>
                <button className={cx('social-icon')} style={{ backgroundPosition: "0 -100%" }}>

                </button>
                <button className={cx('social-icon')} style={{ backgroundPosition: "0 100%" }}>

                </button>

              </div>
              <div className={cx('like')} onClick={() => {
                if (!UserId) {
                  return navigate("/login")
                }
                setLike(pre => !pre)
              }}>
                <svg
                  width="24" height="20" className={cx('like-icon')}>
                  <path d="M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z" stroke="#FF424F" strokeWidth="1.5" fill={like ? "#ff424f" : "none"} fillRule="evenodd" strokeLinejoin="round">
                  </path>
                </svg>
                {`Đã thích(${numberOfLikes < 1000 ? numberOfLikes : (numberOfLikes / 1000).toFixed(1)} )`}
              </div>
            </div>
          </div>

        </Col>
        <Col lg={6} xl={7}>
          <div className={cx('details-box')}>
            <div className={cx('details-title')}>
              {product.title}
            </div>
            <div className={cx('details-quality')}>
              <Link className={cx('rating')} to="#check-rate">
                <p>{rate}</p>
                <div>
                  {rating}
                  {leftrating}
                </div>
              </Link>
              <Link className={cx('quanlity-rate')} to="#check-rate">
                <div>{product.total_rate}</div>
                {` Đánh Giá`}
              </Link>
              <div className={cx('sold')}>
                <div>{formatCurrency(product.sold)}</div>
                Đã Bán
                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" role="img" className={cx('icon')}>
                  <circle cx="7.5" cy="7.5" fill="none" r="6.5" strokeMiterlimit="10">
                  </circle>
                  <path stroke="none" d="m5.3 5.3c.1-.3.3-.6.5-.8s.4-.4.7-.5.6-.2 1-.2c.3 0 .6 0 .9.1s.5.2.7.4.4.4.5.7.2.6.2.9c0 .2 0 .4-.1.6s-.1.3-.2.5c-.1.1-.2.2-.3.3-.1.2-.2.3-.4.4-.1.1-.2.2-.3.3s-.2.2-.3.4c-.1.1-.1.2-.2.4s-.1.3-.1.5v.4h-.9v-.5c0-.3.1-.6.2-.8s.2-.4.3-.5c.2-.2.3-.3.5-.5.1-.1.3-.3.4-.4.1-.2.2-.3.3-.5s.1-.4.1-.7c0-.4-.2-.7-.4-.9s-.5-.3-.9-.3c-.3 0-.5 0-.7.1-.1.1-.3.2-.4.4-.1.1-.2.3-.3.5 0 .2-.1.5-.1.7h-.9c0-.3.1-.7.2-1zm2.8 5.1v1.2h-1.2v-1.2z">
                  </path>
                </svg>
              </div>
              <Link to="#" className={cx('report', "ms-auto")}>Tố Cáo</Link>
            </div>
            <div className={cx('details-price')}>
              {product.sale_off > 0 ? <div className={cx('old-price')}>{`₫${formatCurrency(product.price)}`}</div> : null}

              <div className={cx('new-price')}>
                {product.sale_off > 0 ? `₫${(formatCurrency(product.price * (1 - product.sale_off)))}` :
                  `₫${formatCurrency(product.price)}`
                }</div>
              {product.sale_off > 0 ?
                <div className={cx('sale-off')}>{`${Math.ceil(product.sale_off * 100)}% GIẢM`}</div> :
                null
              }

            </div>
            <div className={cx("details-more")}>
              <div className={cx("protection")}>
                <label className={cx("label")}>Bảo Hiểm</label>
                <div className={cx("name")}>Bảo Hiểm Thời Trang</div>
                <Link className={cx("learn-more")}>Tìm hiểu thêm</Link>

              </div>
              <div className={cx("delivery")}>
                <label>Vận Chuyển</label>
                <div className={cx("content")}>
                  <div>
                    <svg height="14" viewBox="0 0 20 12" width="20" >
                      <g fill="none" fillRule="evenodd" transform="">
                        <rect fill="#00bfa5" fillRule="evenodd" height="9" rx="1" width="12" x="4">
                        </rect>
                        <rect height="8" rx="1" stroke="#00bfa5" width="11" x="4.5" y=".5">
                        </rect>
                        <rect fill="#00bfa5" fillRule="evenodd" height="7" rx="1" width="7" x="13" y="2">
                        </rect>
                        <rect height="6" rx="1" stroke="#00bfa5" width="6" x="13.5" y="2.5">
                        </rect>
                        <circle cx="8" cy="10" fill="#00bfa5" r="2">
                        </circle>
                        <circle cx="15" cy="10" fill="#00bfa5" r="2">
                        </circle>
                        <path d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z" fill="#fff">
                        </path><path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5">
                        </path>
                        <path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5">
                        </path><circle cx="8" cy="10" fill="#047565" r="1">
                        </circle>
                        <circle cx="15" cy="10" fill="#047565" r="1">
                        </circle>
                      </g>
                    </svg>
                    <p  >Miễn phí vận chuyển</p>
                  </div>
                  <div className={cx('deliver-fee')}>
                    <svg className={cx('icon')} enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" >
                      <g>
                        <line fill="none" strokeLinejoin="round" strokeMiterlimit="10" x1="8.6" x2="4.2" y1="9.8" y2="9.8"></line><circle cx="3" cy="11.2" fill="none" r="2" strokeMiterlimit="10">
                        </circle>
                        <circle cx="10" cy="11.2" fill="none" r="2" strokeMiterlimit="10">
                        </circle>
                        <line fill="none" strokeMiterlimit="10" x1="10.5" x2="14.4" y1="7.3" y2="7.3">
                        </line>
                        <polyline fill="none" points="1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1" strokeLinejoin="round" strokeMiterlimit="10">
                        </polyline>
                        <polyline fill="none" points="9.9 3.8 14 3.8 14.5 10.2 11.9 10.2" strokeLinejoin="round" strokeMiterlimit="10">
                        </polyline>
                      </g>
                    </svg>
                    <div className={cx("deliver-wrapper")}>
                      <div className={cx("deliver-place")}>
                        <div className={cx("place-to")} >Vận chuyển tới</div>
                        <div>
                          ₫Phường Tràng Tiền, Hoàn Kiếm
                        </div>
                        <FontAwesomeIcon icon={faAngleDown} size="xs"
                          style={{ color: "#757575", display: "inline-block", marginLeft: "7px" }} />
                      </div>
                      <div className={cx('fee-ship')}>
                        <div className={cx('fee-label')}>Phí vận chuyển</div>
                        <div className={cx('price')}>₫0 - ₫22000</div>
                        <FontAwesomeIcon icon={faAngleDown} size="xs"
                          style={{ color: "#757575", display: "inline-block", marginLeft: "7px" }} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              {detailsProduct.color.length > 0 &&
                <div className={cx("type-color")}>
                  <label className={cx("label")}>Màu</label>
                  <div className={cx("box-btn")}>
                    {detailsProduct?.color.map(item => {

                      return (<div
                        key={item} className={cx("color-btn", item === color ? "active" : "")}
                        onClick={() => {
                          setColor(item)
                        }}
                      >
                        {item}
                        <div className={cx("color-stick")}>
                          <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className={cx("stick-icon")}><g>
                            <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z">
                            </path>
                          </g>
                          </svg>
                        </div>
                      </div>)
                    })}


                  </div>
                </div>
              }
              {detailsProduct.size.length > 0 &&
                <div className={cx("type-size")}>
                  <label className={cx("label")}>SIZE</label>
                  <div className={cx("box-btn")}>
                    {detailsProduct?.size.map(item => {
                      return <button
                        onClick={() => {
                          setSize(item)

                        }}
                        key={item} className={cx("size-btn", item === size ? "active" : "")}>
                        {item}
                        <div className={cx("size-stick")}>
                          <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className={cx("stick-icon")}><g>
                            <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z">
                            </path>
                          </g>
                          </svg>
                        </div>
                      </button>
                    })}


                  </div>
                </div>
              }

              <div className={cx("quanlity")}>
                <label className={cx("label")}>Số Lượng</label>
                <div className={cx("box-quanlity")}>
                  <div className={cx("input-group")}>
                    <button className={cx("quanlity-btn")}
                      onClick={() => {
                        setQuantity(pre => {
                          if (pre === 1) {
                            return pre
                          } else {
                            return --pre
                          }

                        })
                      }}
                    >
                      <FontAwesomeIcon icon={faMinus} size="xs" />
                    </button>
                    <input type="number" value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)) }} />
                    <button className={cx("quanlity-btn")}
                      onClick={() => {
                        setQuantity(pre => {

                          return ++pre
                        })
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} size="xs" />
                    </button>
                  </div>
                  {`${product.quality} sản phẩm có sẵn`}
                </div>
              </div>
              <div className={cx("cart-order")}>
                <div className={cx("cart")} onClick={handlerAddToCart}>
                  <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className={cx("cart-icon")}>
                    <g>
                      <g>
                        <polyline fill="none" points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                        </polyline>
                        <circle cx="6" cy="13.5" r="1" stroke="none">
                        </circle>
                        <circle cx="11.5" cy="13.5" r="1" stroke="none">
                        </circle>
                      </g>
                      <line fill="none" strokeLinecap="round" strokeMiterlimit="10" x1="7.5" x2="10.5" y1="7" y2="7">
                      </line>
                      <line fill="none" strokeLinecap="round" strokeMiterlimit="10" x1="9" x2="9" y1="8.5" y2="5.5">
                      </line>
                    </g>
                  </svg>
                  <p>Thêm Vào Giỏ Hàng</p>
                </div>
                <div className={cx("order")} onClick={handleBuy}>Mua Ngay</div>
              </div>

            </div>
            <div className={cx("shop-guarantee")}>
              <Link className={cx("guarantee-link")}>
                <img src={guarantee} alt={"Shop Đảm Bảo"} />
                <p className={cx("guarantee")}>Shop Đảm Bảo</p>
                <p className={cx("details")}>Ba Ngày Trả Hàng/Hoàn Tiền</p>

              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    {isProductSuccess && <AboutShop products={Array.from(Object.values(products.entities))} numberOfLikes={likes} numberOfRates={numberOfRates} />}

    {
      (isProductSuccess && isSuccess) &&
      <AboutProduct
        userId={UserId}
        productId={id}
        setQuery={setQuery}
        product={product}
        details={detailsProduct}
        products={Object.values(products.entities)}

      />
    }

  </div> : <Container>
    <NotFound title={"Not Found Product"} />
  </Container>
}

export default DetailProduct;

import className from 'classnames/bind';
import { toast } from "react-toastify";

import { Container, Row, Col } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faAngleRight
// } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom"
import styles from './Cart.module.scss';
import { useState, useEffect, useMemo } from 'react';
import { formatCurrency, formatNumberToSocialStyle } from "~/until/formatNumber";
import {
  useUpdatePurchaseMutation,
  useGetUserPurchasesQuery,
  useUpdatePurchasesMutation,
  useDeleteManyOrderMutation,
  useDeleteOneOrderMutation
} from "~/features/UserCart/userCartSlice";
import useAuth from "~/hooks/useAuth";
import EmtyOrder from '~/layouts/components/Header/EmtyOrder';


const cx = className.bind(styles)

function Cart() {
  const [checkAll, setCheckALl] = useState(false);
  const [updateToCart] = useUpdatePurchaseMutation();
  const [updateManyToCart] = useUpdatePurchasesMutation();
  const [deleteOne] = useDeleteOneOrderMutation();
  const [deleteMany] = useDeleteManyOrderMutation();
  const [order, setOrder] = useState([]);
  const { UserId } = useAuth();
  const status = -1
  const { data: userCart, isSuccess: isUserCartSuccess } = useGetUserPurchasesQuery(status, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    forceRefetch: true
  },)
  const location = useLocation();


  useEffect(() => {
    if (isUserCartSuccess) {
      const { ids, entities } = userCart;
      setOrder(ids.map((item, index) => {
        return {
          ...entities[item],
          checked: location?.state?.checked ? Boolean(index === ids.length - 1) : false,
          disabled: false,
        }
      }))
    }

  }, [userCart, isUserCartSuccess, location])
  useEffect(() => {
    return () => {
      window.history.replaceState(null, '');

    };
  }, []);

  useEffect((
  ) => {
    const term = order.every(item => item.checked === true)
    setCheckALl(term)
  }, [order])
  const orderCheck = order.filter(item => item.checked);

  const totalCheckedPurchasePrice = useMemo(
    () =>
      orderCheck.reduce((result, current) => {
        return result + ((1 - current.sale_off) * current.price * current.quantity);
      }, 0),
    [orderCheck]
  );
  const saving = useMemo(
    () =>
      orderCheck.reduce((result, current) => {
        return result + (current.price * current.quantity);
      }, 0),
    [orderCheck]
  );
  const handlePurchase = async () => {
    const listOfOrder = orderCheck.map(item => {
      return {
        id: item.id,
        quantity: item.quantity,
      }
    })

    await updateManyToCart({ listOfOrder, status: 1 })
  }
  const handleDeleteOne = async (id) => {
    const result = await deleteOne(id);
    if (result) {
      toast.success("Remove from Cart Success!", {
        position: 'top-center',
        autoClose: 1000
      });
    }
  }
  const handleDeleteMany = async () => {
    const ids = orderCheck.map(item => item.id);

    const result = await deleteMany({ ids: ids });
    if (result) {
      toast.success("Remove from Cart Success!", {
        position: 'top-center',
        autoClose: 1000
      });
    }
  }
  return (<Container className={cx("wrapper", "pt-4")}>

    {/* <Row className={cx("mb-2")}>
      <div className={cx("notify")}>
        <svg className={cx("me-3")} height="14" viewBox="0 0 20 12" width="20" >
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
        {` Nhấp vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé !`}
      </div>
    </Row> */}
    {order?.length > 0 && <Row className={cx("mb-2 overflow-auto", "sroll-bar")}>
      <div className={cx("header")}>
        <div className={cx("check-all")}>
          <div className={cx("icon", checkAll ? "active" : "")} onClick={(e) => {
            e.stopPropagation();
            setCheckALl(pre => !pre);
            setOrder((pre) =>
              pre.map(item => ({
                ...item,
                checked: !checkAll
              }))
            )

          }}

          ></div>
          Sản Phẩm
        </div>
        <div className={cx("header-box")}>
          <div className={cx("item")}>Đơn Giá</div>
          <div className={cx("item")}>Số Lượng</div>
          <div className={cx("item")}>Số Tiền</div>
          <div className={cx("item")}>Thao Tác</div>
        </div>
      </div>
    </Row>}
    {/* <Row>
      <div className={cx("favourite")}>
        <div className={cx("favor-check")}>
          <div className={cx("icon", favor ? "active" : "")} onClick={(e) => {
            e.stopPropagation();
            setFavor(pre => !pre)

          }}></div>
          <div className={cx("favor")}>Yêu thích</div>
          <div className={cx("price-factory")}>thoitranggiaxuong268</div>
          <svg viewBox="0 0 16 16" className={cx("message-icon")}>
            <g fillRule="evenodd">
              <path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z">
              </path>
            </g>
          </svg>

        </div>
      </div>
    </Row> */}
    <Row>
      {order?.length > 0 ? order.map(item => {
        return <div key={item.id} className={cx("product-order")}>
          {/* <div className={cx("combo-sale")}>
          <div className={cx("sale-off")}>Combo khuyến mãi</div>
          <div className={cx("details")}>Mua 2 sản phẩm giảm 5% giảm đến 10%</div>
          <div className={cx("add")}>
            {`Thêm`}
            <FontAwesomeIcon icon={faAngleRight} style={{
              height: "16px",
              width: "14px",
              marginLeft: "2px",
            }} />
          </div>
        </div> */}

          <div className={cx("list-product")}>
            <div className={cx("product-item")}>
              <div className={cx("icon", item.checked ? "active" : "")} onClick={(e) => {
                e.stopPropagation();
                setOrder(pre => {
                  // eslint-disable-next-line array-callback-return
                  return pre.map(i => {
                    if (i.id === item.id) {
                      return { ...i, checked: !item.checked }
                    }
                    return { ...i }
                  })
                });


              }}></div>

              <img src={`${process.env.REACT_APP_API_IMG_URL}/${item?.img[0][0]}`} className={cx("img-order")} alt="images product" />
              <div className={cx("details-box", "me-auto")}>
                <div className={cx("description")}>{item.product_title}</div>
                <img
                  src="https://down-vn.img.susercontent.com/file/vn-50009109-db365faaaad9dacd3e9603d0f3f7da84"
                  className={cx("img-saleoff")} alt="sale off" />
              </div>
              <div className={cx("more-order")}>
                <Container fluid className={cx("px-0")}>
                  <Row>
                    {/* <Col lg={4} xl={3}>
                      <div className={cx("sort-by")}>
                        <div className={cx("choose-btn")}>
                          <div className={cx("icon-box")}>
                            Phân loại hàng :
                            <div className={cx("choose-icon")}></div>
                          </div>
                          <div>{`Đen, free size < 55kg`}</div>
                        </div>
                      </div>
                    </Col> */}
                    <Col xs={3}>
                      <div className={cx("prices")}>
                        <span className={cx("me-3 d-block h-100 text-decoration-line-through")}>₫{formatCurrency(item.price)} </span>

                        <span className={cx("d-block h-100")}>₫{formatCurrency((1 - item.sale_off) * item.price)}</span>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className={cx("purchase-product")}>
                        <div
                          className={cx("incre-btn")}
                          onClick={async () => {
                            const setValue = item.quantity > 1 ? item.quantity - 1 : 1;
                            console.log(setValue);
                            setOrder(pre => {
                              // eslint-disable-next-line array-callback-return
                              return pre.map(i => {
                                if (i.id === item.id) {
                                  return { ...i, quantity: Number(setValue) }
                                }
                                return { ...i }
                              })
                            });
                            const result = await updateToCart({
                              id: item.id,
                              product: item.productId,
                              user: UserId,
                              quantity: setValue
                            })
                            if (result) {
                              toast.success("Add To Cart Success!", {
                                position: 'top-center',
                                autoClose: 1000
                              });
                            }
                          }}
                        >-</div>
                        <input
                          className={cx("input-btn")}
                          type="text"
                          value={item.quantity}
                          onChange={async (e) => {
                            let setValue = e.target.value > 1 && e.target.value < item.quality ? e.target.value : e.target.value === 0 ? 1 : item.quality
                            setOrder(pre => {
                              // eslint-disable-next-line array-callback-return

                              return pre.map(i => {
                                if (i.id === item.id) {
                                  return { ...i, quantity: Number(setValue) }
                                }
                                return { ...i }
                              })
                            });
                            const result = await updateToCart({
                              id: item.id,
                              product: item.productId,
                              user: UserId,
                              quantity: setValue
                            })
                            if (result) {
                              toast.success("Add To Cart Success!", {
                                position: 'top-center',
                                autoClose: 1000
                              });
                            }
                          }}
                        />
                        <div
                          className={cx("decre-btn")}
                          onClick={async () => {
                            const setValue = item.quantity < item.quality ? item.quantity + 1 : item.quality
                            setOrder(pre => {
                              // eslint-disable-next-line array-callback-return
                              return pre.map(i => {
                                if (i.id === item.id) {
                                  return { ...i, quantity: Number(setValue) }
                                }
                                return { ...i }
                              })
                            });
                            const result = await updateToCart({
                              id: item.id,
                              product: item.productId,
                              user: UserId,
                              quantity: setValue
                            });
                            if (result) {
                              toast.success("Add To Cart Success!", {
                                position: 'top-center',
                                autoClose: 1000
                              });
                            }
                          }}
                        >+</div>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className={cx("total-price")}>₫{formatCurrency((1 - item.sale_off) * item.price)}</div>
                    </Col>
                    <Col xs={3}>
                      <div className={cx("config-order")}>
                        <div className={cx("delete-btn")} onClick={() => handleDeleteOne(item.id)}>Xóa</div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </div>
      }) : <div className='w-100 bg-ư'><EmtyOrder className={cx("full-width")} /></div>
      }

    </Row>
    {order?.length > 0 && <Row >
      <div className={cx("footer")}>
        <div className={cx("icon", checkAll ? "active" : "")} onClick={(e) => {
          e.stopPropagation();
          setCheckALl(pre => !pre);
          setOrder((pre) =>
            pre.map(item => ({
              ...item,
              checked: !checkAll
            }))
          );
        }}>

        </div>

        <div >Chọn tất cả ({orderCheck.length})</div>
        <div
          className={cx('me-auto ms-4', "delete-all")}
          onClick={handleDeleteMany}
        >Xóa</div>
        <div className={cx("total-box")}>
          <div className={cx("price")}>
            Tổng thanh toán (0 sản phâm) :<span>₫{formatCurrency(totalCheckedPurchasePrice)}</span>
          </div>
          <div className={cx("save")}>
            Tiết kiệm  <span>{formatNumberToSocialStyle(saving - totalCheckedPurchasePrice)}</span>
          </div>
        </div>
        <button
          className={cx("purchase", orderCheck.length > 0 ? "" : "disabled")}
          onClick={handlePurchase}
          disabled={orderCheck.length > 0 ? false : true}
        >
          Mua Hàng
        </button>
      </div>
    </Row>
    }
  </Container>);
}

export default Cart;
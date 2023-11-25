import className from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke, } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react"
import { useUpdateRatingMutation } from "~/features/Rating/ratingApiSlice"
import BestSaleProduct from "./BestSaleProduct";
import ProductItem from "~/pages/Home/Components/ProductOffer/ProductItem";


import { Container, Row, Col } from "react-bootstrap";
import styles from "./DetailProduct.module.scss"

const cx = className.bind(styles)



function AboutProduct({ product, details, setQuery, userId, productId, products }) {
  const navigate = useNavigate()
  const [star, setStar] = useState(null);

  const { styles, origin, material, seasion, warehouse, comefrom, details: moreDetails, description,

    return_policy, end_dow, hashtag } = details

  const bestSales = products.sort((a, b) => b.sold - a.sold).slice(0, 6);


  const [updateRate] = useUpdateRatingMutation("updateRating");



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

  return (<Container className={cx("about-product", "px-0")}>
    <Row>
      <Col lg={10}>
        <div className={cx("description-product")}>
          <div className={cx("title")}>
            CHI TIẾT SẢN PHẨM
          </div>
          <div className={cx("body-first")}>
            <Container>
              <div className={cx("details-item")}>
                <div className={cx("details-label")}>Danh Mục</div>
                <div className={cx("details-menu")}>
                  <Link className={cx("link")}>Shop</Link>
                  <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className={cx("menu-icon")}>
                    <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
                    </path>
                  </svg>
                  <Link className={cx("link")}>{product?.type_of_product}</Link>
                  <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className={cx("menu-icon")}>
                    <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
                    </path>
                  </svg>
                  <Link className={cx("link")}>{product?.details}</Link>
                  <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className={cx("menu-icon")}>
                    <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
                    </path>
                  </svg>
                  <div className={cx("menu-title")}>{product?.title}</div>
                </div>
              </div>
            </Container>
            <Container>
              {origin &&
                <div className={cx("details-item")}>
                  <div className={cx("details-label")}>Xuất xứ</div>
                  <div className={cx("details-content")}>{origin}</div>
                </div>
              }
            </Container>
            <Container>
              {styles &&
                <div className={cx("details-item")}>
                  <div className={cx("details-label")}>Phong Cách</div>
                  <div className={cx("details-content")}>{styles}</div>
                </div>
              }
            </Container>
            <Container>
              {material &&
                <div className={cx("details-item")}>
                  <div className={cx("details-label")}>Chất Liệu</div>
                  <div className={cx("details-content")}>{material}</div>
                </div>
              }
            </Container>
            <Container>
              {seasion &&
                <div className={cx("details-item")}>
                  <div className={cx("details-label")}>Mùa</div>
                  <div className={cx("details-content")}>{seasion}</div>
                </div>
              }
            </Container>
            <Container>
              {warehouse &&
                <div className={cx("details-item")}>
                  <div className={cx("details-label")}>Kho</div>
                  <div className={cx("details-content")}>{warehouse}</div>
                </div>
              }
            </Container>
            <Container>
              {comefrom &&
                <div className={cx("details-item")}>
                  <div className={cx("details-label")}>Gửi từ</div>
                  <div className={cx("details-content")}>{comefrom}</div>
                </div>
              }
            </Container>


          </div>
          <div className={cx("title")}>
            MÔ TẢ SẢN PHẨM
          </div>
          <div className={cx("body-second")}>
            <div className={cx("more-detail")}>
              {moreDetails && moreDetails.split(".").map(item => {
                return (<p key={item}>
                  {`${item}.`}
                </p>)
              })}
            </div>
            <div className={cx("description")}>
              Mô tả sản phẩm :
              {description && description.split(".").map(item => {

                return <p key={item}>
                  {`${item.length === 0 ? "" : ` - ${item}`}${item.endsWith(",") ? "..." : "."}`}
                </p>
              })}


            </div>
            {end_dow && <div className={cx("end-down")}>
              CHÍNH SÁCH ĐỔI Trả
              {
                end_dow.split(".").map(item => {
                  return (<p key={item} >
                    {`${item.length === 0 ? "" : ` - ${item}`}${item.endsWith(",") ? "..." : "."}`}
                  </p>)
                })
              }
            </div>}
            {return_policy && <div className={cx("return-policy")}>
              ƯU ĐÃi
              {
                return_policy.split(".").map(item => {
                  return (<p key={item} >
                    {`${item.length === 0 ? "" : ` - ${item}`}${item.endsWith(",") ? "..." : "."}`}
                  </p>)
                })
              }
            </div>}

            <div>{hashtag}</div>
          </div>
        </div>
        <div className={cx('rating')} id="check-rate">
          <div className={cx('header')}>ĐÁNH GIÁ SẢN PHẨM</div>
          <div className={cx('rating-box')}>
            <div className={cx('over-view')}>
              <div className={cx('title')}>
                <p style={{
                  fontSize: "24px",
                  display: "inline-block"
                }}>{product.rating.toFixed(1)}</p>
                {` trên 5`}
              </div>
              <div className={cx("rate")}>
                {rating}
                {leftrating}
              </div>
            </div>
            <div className={cx("rate-btns")}>
              {
                product?.rate_details?.map((item, index) => {


                  return <div
                    key={index}
                    onClick={async () => {
                      if (!userId) {
                        navigate("/login");
                      }

                      const result = await updateRate({ productId, userId, rate: index + 1 })
                      if (result) {
                        setStar(index + 1)
                        setQuery(pre => {
                          return { ...pre, q: !pre.q }
                        })
                      }
                    }}
                    className={cx("rate-btn", (index + 1) === star ? "active" : "")}

                  >{index + 1} Sao{`(${item})`}</div>
                })
              }
            </div>

          </div>

        </div>

        <Container className={cx("header", "primary", className, "px-0")}>
          <div className={cx("title")}>CÁC SẢN PHẨM KHÁC CỦA SHOP</div>

          <div className={cx("btn-more")} onClick={() => {
            navigate("/home/suggest/0")
          }}>

            Xem Tất Cả
          </div>

        </Container>
        <Container>
          <Row>
            {products.slice(0, 24).map(item => {
              return <Col xl={2} lg={3} md={4} sm={6} xs={12} key={item.id} >
                <ProductItem key={item.title} product={item} />
              </Col>
            })}
          </Row>
        </Container>
        <Container className={cx("pt-4")}>
          <Row className={cx("suggest-btn")}>
            <Col xs={4} offset={2}>
              <div
                className={cx("link")}
                onClick={() => {
                  navigate("/home/suggest/0")
                }}
              >Xem Thêm</div>
            </Col>

          </Row>
        </Container>
      </Col>
      <Col lg={2} >

        <Container className={cx(" mt-4 bg-white ")} fluid>
          <Row className={cx("best-sale")}>Top sản phẩm bán chạy</Row>
          <Row className="flex-column ">
            {
              bestSales.map(item => {
                return <Col key={item.title} cx={12} className={cx("p-4")}>
                  <BestSaleProduct product={item} />
                </Col>
              })
            }

          </Row>
        </Container>
      </Col>
    </Row>
  </Container>);
}

export default AboutProduct;
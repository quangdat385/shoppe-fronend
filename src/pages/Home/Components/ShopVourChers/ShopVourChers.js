import className from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./ShopVourCher.module.scss";

import DetailVourCher from "./DetailVourCher";
import { useGetVourChersQuery } from '~/features/Voutcher/vourchersApiSlice';

const cx = className.bind(styles);

function ShopVourChers() {
  const type = "Shop Vourchers"
  const { data, isSuccess } = useGetVourChersQuery(type, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    forceRefetch: true
  },)
  let vouchers = [];
  if (isSuccess) {
    vouchers = Object.values(data.entities)
  }
  const numberOfslice = Math.ceil(vouchers.length / 4);
  console.log(vouchers.length);
  return (<div className={cx("wrapper")}>
    <Container
      className="px-0"

    >
      {vouchers.length > 0 &&
        <div className={cx("shop-vourchers")} >
          <div className={cx("title")}>MÃ GIẢM GIÁ CỦA SHOP</div>
          <Container className={cx("shop-vourchers-md",)}>
            <Row className="flex-row flex-nowrap">
              {vouchers.map(voucher => {
                return <Col key={voucher.id} xs={12} sm={6} md={4}>
                  <DetailVourCher voucher={voucher} />
                </Col>
              })}
            </Row>
          </Container>
          <Container className={cx("shop-vourchers-lg")}>
            <Carousel className="slide-vourcher">
              {Array(numberOfslice).fill(0).map((_, index) => {

                return <Carousel.Item interval={2000} key={index} >
                  <Row >
                    {vouchers.slice(index * 4, 4).map((voucher) => {
                      return <Col>
                        <DetailVourCher voucher={voucher} />
                      </Col>
                    })}
                  </Row>
                </Carousel.Item>
              })}
            </Carousel>
          </Container>
          <div className={cx("btn-back")}>
            <FontAwesomeIcon icon={faAngleLeft} className={cx("btn-icon-left")} />
          </div>
          <div className={cx("btn-next")} >
            <FontAwesomeIcon icon={faAngleRight} className={cx("btn-icon-right")} />
          </div>
        </div>
      }


    </Container>

  </div>);
}

export default ShopVourChers;
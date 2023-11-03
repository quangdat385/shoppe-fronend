import { Link, createSearchParams } from 'react-router-dom';
import className from 'classnames/bind';
import { purchasesStatus } from '~/constants/purchaseConstant';
import { Container, Row, Col } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faAngleRight
// } from "@fortawesome/free-solid-svg-icons";

import styles from './OrderList.module.scss';
import { formatCurrency } from "~/until/formatNumber";
import EmtyOrder from '~/layouts/components/Header/EmtyOrder';

import useQueryParams from '~/hooks/useQueryParams';
import { useGetUserPurchasesQuery } from "~/features/UserCart/userCartSlice";

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' }
];

const cx = className.bind(styles)

function OrderList() {
  const { status } = useQueryParams();
  let order = [];

  const { data: userCart, isSuccess } = useGetUserPurchasesQuery(Number(status), {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    forceRefetch: true
  },)

  if (isSuccess) {
    const { entities } = userCart;
    order = Object.values(entities)
  }




  return (<Container fluid className={cx("wrapper", "pt-4")}>
    <Row className={cx("menu")}>
      {purchaseTabs.map(tab => {
        return <Col xs={2}>
          <Link
            key={tab.status}
            to={{
              pathname: "/user/order/list",
              search: createSearchParams({
                status: String(tab.status)
              }).toString()
            }}
            className={cx(tab.status === Number(status) ? "active" : "", "link")}
          >
            {tab.name}
          </Link>
        </Col>
      })}
    </Row>
    <Row className={cx("mb-2")}>
      <div className={cx("header")}>
        <div className={cx("check-all")}>
          Sản Phẩm
        </div>
        <div className={cx("header-box")}>
          <div className={cx("item")}>Đơn Giá</div>
          <div className={cx("item")}>Số Lượng</div>
          <div className={cx("item")}>Số Tiền</div>
        </div>
      </div>
    </Row>
    <Row>
      {order?.length > 0 ? order.map(order => {
        return <div key={order.id} className={cx("product-order")}>
          <div className={cx("list-product")}>
            <div className={cx("product-item")}>
              <img src={`${process.env.REACT_APP_API_IMG_URL}/${order?.img[0][0]}`} className={cx("img-order")} alt="images product" />
              <div className={cx("details-box")}>
                <div className={cx("description")}>Quần legging ngố đù trên gốii nữ nâng mông cạp cao co giãn 4 chiều - Quần Legging Lửng Nữ Xuất Hàn tập gym yoga</div>
                <img
                  src="https://down-vn.img.susercontent.com/file/vn-50009109-db365faaaad9dacd3e9603d0f3f7da84"
                  className={cx("img-saleoff")} alt="sale off" />
              </div>
            </div>
            <div className={cx("more-order")}>
              <div className={cx("prices")}>
                <span className={cx("me-3 d-block h-100")}>₫{formatCurrency(order.price)}</span>

                <span className={cx("d-block h-100")}>₫{formatCurrency((1 - order.sale_off) * order.price)}</span>
              </div>
              <div className={cx("purchase-product")}>
                {order.quantity}
              </div>
              <div className={cx("total-price")}>₫{formatCurrency((1 - order.sale_off) * order.price * order.quantity)}</div>
            </div>
          </div>
        </div>
      }) : <div className='w-100 bg-ư'><EmtyOrder className={cx("full-width")} /></div>}

    </Row>

  </Container>);
}

export default OrderList;
import className from 'classnames/bind';
import { Link, NavLink, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';





import { useState } from 'react';
import avatar from "~/assets/images/20210214_092405.jpg";
import Gift from "~/assets/images/97cb82f5dd0a13419b1608c16681df9e.png";
import MyAccount from "~/assets/images/myaccout.png";
import SaleBirth from "~/assets/images/sieusale12.12.png";
import OderList from "~/assets/images/donmua.png";
import NotifiImg from "~/assets/images/thongbao.png"
import Voucher from "~/assets/images/voucher.png"
import Coin from "~/assets/images/coin.png"

import styles from './UserSideBar.module.scss';
import useAuth from '~/hooks/useAuth';


const cx = className.bind(styles);

const UserSideBar = () => {
    const navigate = useNavigate();
    const { user_name } = useAuth();
    const [show, setShow] = useState(JSON.parse(localStorage.getItem("user_page")) || 3);


    const toggleShowC = () => {
        setShow(3)
        localStorage.setItem("user_page", 3)
        navigate("/user/profile")

    }
    const toggleShowB = () => {
        setShow(2)
        localStorage.setItem("user_page", 2)
        navigate("shop/birthday")

    }
    const toggleShowA = () => {
        setShow(1)
        localStorage.setItem("user_page", 1)
        navigate("gift/voucher")

    }
    const toggleShowD = () => {
        setShow(4)
        localStorage.setItem("user_page", 4)
        navigate("order/list")

    }
    const toggleShowE = () => {
        setShow(5)
        localStorage.setItem("user_page", 5)
        navigate("notify/order/updates")

    }
    const toggleShowF = () => {
        setShow(6)
        localStorage.setItem("user_page", 6)
        navigate("my/voucher")

    }
    const toggleShowG = () => {
        setShow(7)
        localStorage.setItem("user_page", 7)
        navigate("my/coin")

    }






    return (
        <div className={cx('wrapper')}>
            <Container fluid>
                <Row className="py-4">
                    <Col xs={4} sm={4}>
                        <div className={cx("avatar")}>
                            <div className={cx("avatar-placeholder")}>
                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className={cx("avatar-icon")}>
                                    <g>
                                        <circle cx="7.5" cy="4.5" fill="none" r="3.8" strokeMiterlimit="10"></circle>
                                        <path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" strokeMiterlimit="10">
                                        </path>
                                    </g>
                                </svg>
                                {user_name ? <img className={cx("avatar-img")} src={avatar} alt="avatar" /> : null}



                            </div>
                        </div>
                    </Col>
                    <Col xs={8} sm={8}>
                        <div className={cx("ps-2 d-flex flex-column justify-content-center align-items-start fs-4")}>
                            <Col className={cx("user-name")}>{user_name}</Col>
                            <Col className="text-black-50">
                                <Link>
                                    <svg className={cx('repair-icon')} width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" >
                                        <path d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48" fill="#9B9B9B" fillRule="evenodd">
                                        </path>
                                    </svg>
                                    Sửa Hồ Sơ
                                </Link>
                            </Col>
                        </div>
                    </Col>
                </Row>
                <Row>


                    <Col md={12} className="mb-2">


                        <Button
                            onClick={toggleShowA}

                            data-toggle="1"
                            variant="light"
                            to="user/gift"
                            className={cx("mb-4 fs-4 fw-normal mb-2 w-100 bg-transparent border-0 d-flex justify-content-start align-items-center")}>
                            <Col xs={2} sm={3} className="align-items-start">
                                <img className="rounded-circle bg-white" height="20px" width="20px" src={Gift} alt="Gift" />
                            </Col>
                            <Col xs={10} sm={9} className="align-items-start">
                                <span className="lh-1 text-start d-block ">
                                    Ưu Đãi Dành Riêng Cho Bạn
                                </span>
                            </Col>
                        </Button>
                        <Container fluid className={cx((show === 1) ? "my-toast show" : "my-toast", "bg-transparent border-0 shadow-none ps-4")}>

                            <NavLink aria-current={(isActive) => (isActive === true) ? "page" : null} className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/gift/voucher">Kho Voucher Của Bạn</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/gift/offer">Tặng Đến 400K</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/gift/saleoff">Gì Cũng Rẻ</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/gift/code">Mã Giảm Giá</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/gift/freeship">Miễn Phí Vận Chuyển</NavLink>



                        </Container>
                    </Col>
                    <Col md={12}>
                        <Button


                            variant="light"
                            onClick={toggleShowB}

                            className={cx("mb-4 fs-4 fw-normal mb-2 w-100 bg-transparent border-0 d-flex justify-content-start align-items-center")}>
                            <Col xs={2} sm={3} className="align-items-start">
                                <img height="20px" width="20px" src={SaleBirth} alt="Gift" />
                            </Col>
                            <Col xs={10} sm={9} className="align-items-start">
                                <span className="lh-1 text-start d-block ">
                                    12.12 Siêu Sale Sinh Nhật
                                </span>
                            </Col>
                        </Button>
                    </Col>
                    <Col md={12} className="mb-2">
                        <Button


                            variant="light"
                            onClick={toggleShowC}

                            className={cx("mb-4 fs-4 fw-normal mb-2 w-100 bg-transparent border-0 d-flex justify-content-start align-items-center")}>
                            <Col xs={2} sm={3} className="align-items-start">
                                <img height="20px" width="20px" src={MyAccount} alt="Gift" />
                            </Col>
                            <Col xs={10} sm={9} className="align-items-start">
                                <span className="lh-1 text-start d-block ">
                                    Tài Khoản Của Tôi
                                </span>
                            </Col>
                        </Button>
                        <Container fluid className={cx((show === 3) ? "my-toast show" : "my-toast", "bg-transparent border-0 shadow-none ps-4")}>

                            <NavLink aria-current={(isActive) => (isActive === true) ? "page" : null} className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/profile">Hồ Sơ</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/bank">Ngân Hàng</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/address">Địa Chỉ</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/password">Đổi Mật Khẩu</NavLink>




                        </Container>
                    </Col>
                    <Col md={12}>
                        <Button


                            variant="light"
                            onClick={toggleShowD}

                            className={cx("mb-4 fs-4 fw-normal mb-2 w-100 bg-transparent border-0 d-flex justify-content-start align-items-center")}>
                            <Col xs={2} sm={3} className="align-items-start">
                                <img height="20px" width="20px" src={OderList} alt="Gift" />
                            </Col>
                            <Col xs={10} sm={9} className="align-items-start">
                                <span className="lh-1 text-start d-block ">
                                    Đơn Mua
                                </span>
                            </Col>
                        </Button>
                    </Col>
                    <Col md={12} className="mb-2">
                        <Button


                            variant="light"
                            onClick={toggleShowE}

                            className={cx("mb-4 fs-4 fw-normal mb-2 w-100 bg-transparent border-0 d-flex justify-content-start align-items-center")}>
                            <Col xs={2} sm={3} className="align-items-start">
                                <img height="20px" width="20px" src={NotifiImg} alt="Gift" />
                            </Col>
                            <Col xs={10} sm={9} className="align-items-start">
                                <span className="lh-1 text-start d-block ">
                                    Thông Báo
                                </span>
                            </Col>
                        </Button>
                        <Container fluid className={cx((show === 5) ? "my-toast show" : "my-toast", "bg-transparent border-0 shadow-none ps-4")}>

                            <NavLink aria-current={(isActive) => (isActive === true) ? "page" : null} className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/notify/order/updates">Cập Nhật Đơn Hàng</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/notify/promotions">Khuyến Mãi</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/notify/wallet/update">Cập Nhật Ví</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/notify/activities">Hoạt Động</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/notify/rating">Cập Nhật Đánh Giá</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/notify/shop/update">Cập Nhật Shopee</NavLink>




                        </Container>
                    </Col>
                    <Col md={12}>
                        <Button


                            variant="light"
                            onClick={toggleShowF}

                            className={cx("mb-4 fs-4 fw-normal mb-2 w-100 bg-transparent border-0 d-flex justify-content-start align-items-center")}>
                            <Col xs={2} sm={3} className="align-items-start">
                                <img height="20px" width="20px" src={Voucher} alt="Gift" />
                            </Col>
                            <Col xs={10} sm={9} className="align-items-start">
                                <span className="lh-1 text-start d-block ">
                                    Kho Voucher
                                </span>
                            </Col>
                        </Button>
                    </Col>
                    <Col md={12}>
                        <Button


                            variant="light"
                            onClick={toggleShowG}

                            className={cx("mb-4 fs-4 fw-normal mb-2 w-100 bg-transparent border-0 d-flex justify-content-start align-items-center")}>
                            <Col xs={2} sm={3} className="align-items-start">
                                <img height="20px" width="20px" src={Coin} alt="Gift" />
                            </Col>
                            <Col xs={10} sm={9} className="align-items-start">
                                <span className="lh-1 text-start d-block ">
                                    Shopee Xu
                                </span>
                            </Col>
                        </Button>
                    </Col>


                </Row>

            </Container>

        </div>
    )
}
export default UserSideBar;

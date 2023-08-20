import className from 'classnames/bind';
import { Link, NavLink, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBars } from '@fortawesome/free-solid-svg-icons'



import { useState } from 'react';

import Gift from "~/assets/images/97cb82f5dd0a13419b1608c16681df9e.png";
import MyAccount from "~/assets/images/myaccout.png";
import SaleBirth from "~/assets/images/sieusale12.12.png";
import OderList from "~/assets/images/donmua.png";
import NotifiImg from "~/assets/images/thongbao.png"
import Voucher from "~/assets/images/voucher.png"
import Coin from "~/assets/images/coin.png"

import styles from './UserSideBar.module.scss';
import useAuth from '~/hooks/useAuth';
import Avatar from '~/components/Avatar'


const cx = className.bind(styles);

const UserSideBar = ({ user }) => {
    // // const API_IMG_URL = 'http://localhost:3500/img';
    const API_IMG_URL = 'https://datnguyenshop-api.onrender.com/img';
    const navigate = useNavigate();
    const { user_name } = useAuth();
    const [hidden, setHidden] = useState(true);
    const [show, setShow] = useState(JSON.parse(localStorage.getItem("user_page")) || 3);



    const toggleShow = (showNumber, url) => {
        setShow(showNumber)
        localStorage.setItem("user_page", showNumber)
        navigate(url)

    }




    return (
        <div className={cx('wrapper')}>
            <div className={cx('mobile-menu')} onClick={() => {
                setHidden(pre => !pre)
            }}>
                <FontAwesomeIcon icon={faBars}
                    className={cx("sub-menu-icon")}
                />

            </div>
            <Container fluid className={cx('pc-menu', hidden ? "hidden" : "")}>
                <Row className="py-4">
                    <Col xs={4} sm={4}>
                        <Avatar
                            className={cx('avatar')}
                            src={`${API_IMG_URL}/avatar/${user?.avatar[0]}`}
                            user={user_name ? user_name : null}

                        />

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
                            onClick={() => toggleShow(1, "gift/voucher")}


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
                            onClick={() => toggleShow(2, "shop/birthday")}

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
                            onClick={() => toggleShow(3, "/user/profile")}

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
                            onClick={() => toggleShow(4, "order/list")}

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
                            onClick={() => toggleShow(5, "notify/order/updates")}

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
                            onClick={() => toggleShow(6, "my/voucher")}

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
                            onClick={() => toggleShow(7, "my/coin")}

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

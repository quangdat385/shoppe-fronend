import className from 'classnames/bind';
import { Link, NavLink, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Nav from 'react-bootstrap/Nav';




import { useState } from 'react';
import avatar from "~/assets/images/20210214_092405.jpg";
import Gift from "~/assets/images/97cb82f5dd0a13419b1608c16681df9e.png"


import styles from './UserSideBar.module.scss';
import useAuth from '~/hooks/useAuth';


const cx = className.bind(styles);

const UserSideBar = () => {
    const navigate = useNavigate();
    const { user_name } = useAuth();
    const [show, setShow] = useState(1);
    console.log(show);

    const toggleShowA = () => {
        setShow(1)


    }
    const toggleShowB = () => {
        setShow(2)
        navigate("gift")

    }






    return (
        <div className={cx('wrapper')}>
            <Container fluid>
                <Row className="py-4">
                    <Col sm={4}>
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
                    <Col sm={8}>
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
                            as={Nav.Link}
                            variant="light"
                            onClick={toggleShowA}
                            to="/"
                            className={cx("mb-4 fs-4 fw-normal mb-2 w-100 bg-transparent border-0 d-flex justify-content-start align-items-center")}>
                            <Col sm={3} className="align-items-start">
                                <img className="rounded-circle bg-white" height="20px" width="20px" src={Gift} alt="Gift" />
                            </Col>
                            <Col sm={9} className="align-items-start">
                                <span className="lh-1 text-start d-block ">
                                    Ưu Đãi Dành Riêng Cho Bạn
                                </span>
                            </Col>
                        </Button>
                        <Toast show={(show === 1 ? true : false)} className="my-toast bg-transparent border-0 shadow-none ps-4">

                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user">Kho Voucher Của Bạn</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/a">Tặng Đến 400k</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/b">Gì Cũng Rẻ</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/c">Mã Giảm Giá</NavLink>
                            <NavLink className={(nav) => cx('my-link', { active: nav.isActive })} to="/user/d">Miễn Phí Vận Chuyển</NavLink>



                        </Toast>
                    </Col>
                    <Col md={12} className="mb-2">


                        <Button
                            onClick={toggleShowB}
                            as={Nav.Link}
                            data-toggle="1"
                            variant="light"
                            to="user/gift"
                            className={cx("mb-4 fs-4 fw-normal mb-2 w-100 bg-transparent border-0 d-flex justify-content-start align-items-center")}>
                            <Col sm={3} className="align-items-start">
                                <img className="rounded-circle bg-white" height="20px" width="20px" src={Gift} alt="Gift" />
                            </Col>
                            <Col sm={9} className="align-items-start">
                                <span className="lh-1 text-start d-block ">
                                    Ưu Đãi Dành Riêng Cho Bạn
                                </span>
                            </Col>
                        </Button>
                        <Toast data-toggle="1" show={(show === 2) ? true : false} className="bg-transparent border-0 shadow-none ps-4">
                            <Nav defaultActiveKey="/user/gift" className="flex-column fs-4 ">
                                <Nav.Link className="link-dark" href="/user/gift">Kho Voucher Của Bạn</Nav.Link>
                                <Nav.Link className="link-dark" eventKey="link-1">Tặng Đến 400k</Nav.Link>
                                <Nav.Link className="link-dark" eventKey="link-2">Gì Cũng Rẻ</Nav.Link>
                                <Nav.Link className="link-dark" eventKey="link-2">Mã Giảm Giá</Nav.Link>
                                <Nav.Link className="link-dark" eventKey="link-2">Miễn Phí Vận Chuyển</Nav.Link>
                            </Nav>


                        </Toast>
                    </Col>


                </Row>
                <Row>



                </Row>




                <Row>




                </Row>
                <Row>

                </Row>
                <Row>

                </Row>
                <Row>

                </Row>
                <Row>

                </Row>

            </Container>

        </div>
    )
}
export default UserSideBar;

import className from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./ShopVourCher.module.scss";

import DetailVourCher from "./DetailVourCher";


const cx = className.bind(styles);

function ShopVourChers() {
    return (<div className={cx("wrapper")}>
        <Container
            className="px-0"

        >
            <div className={cx("shop-vourchers")} >
                <div className={cx("title")}>MÃ GIẢM GIÁ CỦA SHOP</div>
                <Container className={cx("shop-vourchers-md",)}>
                    <Row className="flex-row flex-nowrap">
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <DetailVourCher />
                        </Col>

                    </Row>
                </Container>
                <Container className={cx("shop-vourchers-lg")}>
                    <Carousel className="slide-vourcher">
                        <Carousel.Item interval={2000} >
                            <Row >
                                <Col>
                                    <DetailVourCher />
                                </Col>
                                <Col>
                                    <DetailVourCher />
                                </Col>
                                <Col>
                                    <DetailVourCher />
                                </Col>
                                <Col>
                                    <DetailVourCher />
                                </Col>
                            </Row>

                        </Carousel.Item>

                        <Carousel.Item interval={2000}>
                            <Row >
                                <Col>
                                    <DetailVourCher />
                                </Col>
                                <Col>
                                    <DetailVourCher />
                                </Col>
                                <Col>
                                    <DetailVourCher />
                                </Col>
                                <Col>
                                    <DetailVourCher />
                                </Col>
                            </Row>

                        </Carousel.Item>


                    </Carousel>


                </Container>
                <div className={cx("btn-back")}>
                    <FontAwesomeIcon icon={faAngleLeft} className={cx("btn-icon-left")} />
                </div>
                <div className={cx("btn-next")} >
                    <FontAwesomeIcon icon={faAngleRight} className={cx("btn-icon-right")} />
                </div>
            </div>

        </Container>

    </div>);
}

export default ShopVourChers;
import ClassName from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

// import { useState, useEffect } from "react";





import styles from "../ProductCatalogue.module.scss";
import ProductItem from "../../ProductOffer/ProductItem";



const cx = ClassName.bind(styles);

function SubPages({ page, isTrue }) {
    const a = useParams()
    console.log(a)
    console.log(page)





    let content = (<Container className={cx("px-0", isTrue ? "" : "d-none")}>
        <Row className={cx("g-3")}>
            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12}>
                <ProductItem />
            </Col>

        </Row>

    </Container>)

    return (<Container className="px-0" >
        {content}
    </Container>

    );
}

export default SubPages;

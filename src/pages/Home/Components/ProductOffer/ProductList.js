import className from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap"

import ProductItem from "./ProductItem";



import styles from "./ProductOffer.module.scss";

const cx = className.bind(styles)



function ProductList() {




    return (<Container className={cx("px-0")}>
        <Row className={cx("g-3")}>

            <Col xl={2} lg={3} md={4} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col xl={2} lg={3} md={4} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col xl={2} lg={3} md={4} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col xl={2} lg={3} md={4} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col xl={2} lg={3} md={4} sm={6} xs={12}>
                <ProductItem />
            </Col>
            <Col xl={2} lg={3} md={4} sm={6} xs={12}>
                <ProductItem />
            </Col>
        </Row>


    </Container>

    );
}

export default ProductList;
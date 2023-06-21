import className from 'classnames/bind';

import { Container, Row, Col } from "react-bootstrap"

import ProductItem from '~/pages/Home/Components/ProductOffer/ProductItem';
import NotFound from '~/pages/Home/Components/ProductCatalogue/SubPages/NotFound';
import styles from "./Search.module.scss";


const cx = className.bind(styles);


function ProductList({ pageProducts, isNotFound }) {
    return (
        <Container className={cx("px-0")}>
            {isNotFound ? <NotFound title={"Không Tìm Thấy Sản Phẩm"} height={"50vh"} /> :
                <Row className={cx("g-3 pb-5 mt-4")}>
                    {pageProducts?.length ? pageProducts.map((product) => {
                        return (<Col className={cx("config")} md={3} sm={6} xs={12} key={product.rateId}>
                            <ProductItem product={product} key={product.createdAt} />
                        </Col>)
                    }) : ""}
                </Row>
            }

        </Container>);
}

export default ProductList;
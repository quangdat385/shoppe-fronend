import ClassName from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { memo } from "react";


import 'animate.css';





import styles from "../ProductCatalogue.module.scss";
import ProductSearchItem from "../../ProductOffer/ProductSearchItem";



const cx = ClassName.bind(styles);

function SubPages({ isTrue, products, isLoading, isSuccess }) {
    let content;
    if (isLoading) {
        return content = (<Container className={cx("px-0", isTrue ? "" : "d-none")}>
            <h1> Loading... </h1>
        </Container>)
    }
    if (isSuccess) {
        const { ids, entities } = products;

        return content = <Container className={cx("px-0", isTrue ? "" : "d-none")}>
            <Row className={cx("g-3 animate__animated animate__fadeIn")}>
                {ids?.length && ids?.map((id, index) => {
                    const product = entities[id];
                    return (<Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12} key={index}>
                        <ProductSearchItem product={product} key={id} />
                    </Col>)
                })}
            </Row>
        </Container>
    }


    return (<div className={cx("sub-page")} >
        {content}
    </div>

    );
}

export default memo(SubPages);

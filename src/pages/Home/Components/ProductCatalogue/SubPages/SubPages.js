import ClassName from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, memo } from "react";

import { useParams } from "react-router-dom"





import styles from "../ProductCatalogue.module.scss";
import ProductSearchItem from "../../ProductOffer/ProductSearchItem";
import NotFound from './NotFound';



const cx = ClassName.bind(styles);

function SubPages({ isTrue, products, isLoading, isSuccess, pages }) {
    const { page } = useParams()

    const [isNotFound, setIsNotFound] = useState(false);
    useEffect(() => {
        if (!pages.includes(Number(page))) {
            setIsNotFound(true)
        }
    }, [page, pages])
    let content;
    if (isLoading) {
        return content = (<Container className={cx("px-0", isTrue ? "" : "d-none")}>
            <h1> Loading... </h1>
        </Container>)
    }
    if (isSuccess) {
        const { ids, entities } = products;

        return content = isNotFound ? <NotFound /> : <Container className={cx("px-0", isTrue ? "" : "d-none")}>
            <Row className={cx("g-3")}>
                {ids?.length && ids?.map((id, index) => {
                    const product = entities[id];
                    return (<Col className={cx("config")} xl={2} lg={3} md={3} sm={6} xs={12} key={index}>
                        <ProductSearchItem product={product} key={id} />
                    </Col>)
                })}
            </Row>


        </Container>
    }


    return (<div className="px-0" >
        {content}
    </div>

    );
}

export default memo(SubPages);

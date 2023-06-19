import className from "classnames/bind";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import styles from "./ProductOffer.module.scss";
import ProductList from "./ProductList";

const cx = className.bind(styles);

function ProductOffer({ title, more = false, className, products }) {
    const navigate = useNavigate()
    return (<div className={cx("wrapper")} >
        <Container className={cx("header", className, "px-0")}>
            <div className={cx("title")}>{title}</div>
            {
                more ? <div className={cx("btn-more")} onClick={() => {
                    navigate("/home/suggest/0")
                }}>

                    Xem Tất Cả
                </div> : null

            }

        </Container>
        <Container className="px-0">
            <ProductList products={products} />
        </Container>



    </div>);
}

export default ProductOffer;
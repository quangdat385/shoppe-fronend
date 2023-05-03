import className from "classnames/bind";
import { Container } from "react-bootstrap";



import styles from "./ProductOffer.module.scss";
import ProductList from "./ProductList";

const cx = className.bind(styles)

function ProductOffer({ title, more = false, className }) {
    return (<div className={cx("wrapper")} >
        <Container className={cx("header", className, "px-0")}>
            <div className={cx("title")}>{title}</div>
            {
                more ? <div className={cx("btn-more")}>

                    Xem Tất Cả
                </div> : null

            }

        </Container>
        <Container className="px-0">
            <ProductList />
        </Container>



    </div>);
}

export default ProductOffer;
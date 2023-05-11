import ClassName from "classnames/bind";
import { Container } from "react-bootstrap";






import styles from "../ProductCatalogue.module.scss";



const cx = ClassName.bind(styles);

function NotFound() {
    return (<Container fluid
        className={cx("d-flex justify-content-center  bg-white", "not-found-wrapper")}
        style={{ height: "100vh" }}
    >
        <h1 className={cx("not-found")}>404 Not Found</h1>
    </Container>);
}

export default NotFound;

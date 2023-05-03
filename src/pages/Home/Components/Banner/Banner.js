import className from "classnames/bind";

import { Container } from "react-bootstrap";
import { forwardRef } from "react";
import { Link } from "react-router-dom"

import styles from "./Banner.module.scss";


const cx = className.bind(styles);


function Banner({ src }, ref) {
    return (<div className={cx("wrapper")}>
        <Link>
            <Container className={cx("px-0")}>
                <img className={cx("banner-img")} ref={ref} src={src} alt="banner img" />
            </Container>
        </Link>

    </div>);
}

export default forwardRef(Banner);
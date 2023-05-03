import className from "classnames/bind";

import { Container, Carousel } from "react-bootstrap";
import { forwardRef } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


import styles from "./AboutShop.module.scss";


const cx = className.bind(styles);

function AboutShop(props, ref) {



    return (<div className={cx('wrapper')}>
        <Container className={cx("about-shop", 'px-0')}>
            <Carousel
                className="about-shop"
            >

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://down-aka-vn.img.susercontent.com/vn-11134210-23030-t4cu8oe254nv8d.webp"
                        alt="First slide"
                        ref={ref}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://down-aka-vn.img.susercontent.com/vn-11134210-23030-0vdyyzyr54nv69.webp"
                        alt="Second slide"
                        ref={ref}
                    />
                </Carousel.Item>

            </Carousel>
            <div className={cx("btn-back")} >
                <FontAwesomeIcon icon={faAngleLeft} className={cx("btn-icon-left")} />
            </div>
            <div className={cx("btn-next")} >
                <FontAwesomeIcon icon={faAngleRight} className={cx("btn-icon-right")} />
            </div>
        </Container>

    </div>);
}

export default forwardRef(AboutShop);

import className from 'classnames/bind';

import { useState, useEffect, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


import styles from './Search.module.scss';


const cx = className.bind(styles);


function ByRating({ title, setMenu }) {





    return (<div className={cx("search-by-rating")}>
        <p className={cx("title")}>{title}</p>
        <div className={cx("rating")}>
            <div className={cx("rating-item")} onClick={() => setMenu(5)}>
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
            </div>
            <div className={cx("rating-item")} onClick={() => setMenu(4)}>
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#d5d5d5",
                    height: "10px",
                }} />
                <div>trở lên</div>
            </div>
            <div className={cx("rating-item")} onClick={() => setMenu(3)}>
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#d5d5d5",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#d5d5d5",
                    height: "10px",
                }} />
                <div>trở lên</div>
            </div>
            <div className={cx("rating-item")} onClick={() => setMenu(2)}>
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#d5d5d5",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#d5d5d5",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#d5d5d5",
                    height: "10px",
                }} />
                <div>trở lên</div>
            </div>
            <div className={cx("rating-item")} onClick={() => setMenu(1)} >
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#ffcc3d",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#d5d5d5",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#d5d5d5",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#d5d5d5",
                    height: "10px",
                }} />
                <FontAwesomeIcon className={cx("rating-star")} icon={faStar} style={{
                    color: "#d5d5d5",
                    height: "10px",
                }} />

                <div>trở lên</div>
            </div>

        </div>

    </div>);
}

export default memo(ByRating);
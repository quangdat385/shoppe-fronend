import className from 'classnames/bind';

import { useState, useEffect, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


import styles from './Search.module.scss';


const cx = className.bind(styles);


function ByRating({ menu, title, setMenu }) {

    const [rate, setRate] = useState(menu)
    const rating = [5, 4, 3, 2, 1];

    useEffect(() => {
        setMenu(rate)
        // eslint-disable-next-line 
    }, [rate])

    return (<div className={cx("search-by-rating")}>
        <p className={cx("title")}>{title}</p>
        <div className={cx("rating")}>
            {rating.map((rating) => {
                if (rating === 5) {
                    return (<div className={cx("rating-item", rating === rate ? "active" : "")} key={rating} onClick={() => setRate(rating)}>
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
                    </div>)
                } else if (rating === 4) {
                    return (<div className={cx("rating-item", rating === rate ? "active" : "")} key={rating} onClick={() => setRate(rating)}>
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
                    </div>)
                } else if (rating === 3) {
                    return (<div className={cx("rating-item", rating === rate ? "active" : "")} key={rating} onClick={() => setRate(rating)}>
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
                    </div>)
                } else if (rating === 2) {
                    return (<div className={cx("rating-item", rating === rate ? "active" : "")} key={rating} onClick={() => setRate(rating)}>
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
                    </div>)
                } else {
                    return (<div className={cx("rating-item", rating === rate ? "active" : "")} key={rating} onClick={() => setRate(rating)} >
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
                    </div>)
                }
            })}

        </div>

    </div>);
}

export default memo(ByRating);
import className from 'classnames/bind';

import { useState, memo } from "react";



import styles from './Search.module.scss';


const cx = className.bind(styles);


function RangePrice({ title, menu, setMenu }) {

    const [rangeFrom, setRangeFrom] = useState(menu?.from || "");
    const [rangeTo, setRangeTo] = useState(menu?.to || "");
    const [visible, setVisible] = useState(false);

    const hanleRangeFrom = (e) => {
        if (Number(e.target.value) >= 0) {
            setVisible(false)
            setRangeFrom(Number(e.target.value))
        } else if (Number(e.target.value) < 0) {
            setVisible(false)
            setRangeFrom(Number(0))
        } else {
            setVisible(true)
            setRangeFrom(Number(0))
        }
    }

    const handleBtnRange = () => {
        if (rangeFrom > rangeTo) {
            return setMenu({ to: rangeTo, from: rangeFrom })
        }
        setVisible(true)
    }


    return (<div className={cx("search-by-price")}>
        <p className={cx("title")}>{title}</p>
        <div className={cx("input-wrapper")}>
            <input
                type="number"
                placeholder="₫ TỪ"
                value={rangeTo}
                maxLength={13}
                onChange={(e) => {
                    if (Number(e.target.value) >= 0) {
                        setVisible(false)
                        setRangeTo(Number(e.target.value))
                    } else if (Number(e.target.value) < 0) {
                        setVisible(false)
                        setRangeTo(Number(0))
                    } else {
                        setVisible(true)
                        setRangeTo(Number(0))
                    }
                }}
                step={1000}

            />
            <p ></p>
            <input
                type="number"
                placeholder="₫ ĐẾN"
                maxLength={13}
                onChange={hanleRangeFrom}
                step={1000}
                value={rangeFrom}
            />

        </div>
        <div className={cx("text", visible ? "visible" : "")}>Vui lòng điền khoảng giá phù hợp</div>
        <button
            className={cx("range-btn")}
            onClick={handleBtnRange}
        >ÁP DỤNG</button>
    </div>);
}

export default memo(RangePrice);
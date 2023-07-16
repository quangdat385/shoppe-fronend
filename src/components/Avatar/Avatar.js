import className from 'classnames/bind';
import { forwardRef } from 'react';


import styles from './Avatar.module.scss'

const cx = className.bind(styles);

function Avatar({ src, user, className, width = 15, height = 15 }, ref) {
    return (
        <div className={cx("avatar", className)} >
            <div className={cx("avatar-placeholder")}>
                <svg width={width} height={height} enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className={cx("avatar-icon")}>
                    <g>
                        <circle cx="7.5" cy="4.5" fill="none" r="3.8" strokeMiterlimit="10"></circle>
                        <path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" strokeMiterlimit="10">
                        </path>
                    </g>
                </svg>
                {user ? <img ref={ref} className={cx("avatar-img")} src={src || null} alt="" /> : null}

            </div>
        </div>
    );
}



export default forwardRef(Avatar);
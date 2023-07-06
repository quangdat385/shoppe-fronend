import className from 'classnames/bind';

import { useState, useEffect, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown
} from "@fortawesome/free-solid-svg-icons";


import styles from './Search.module.scss';
const cx = className.bind(styles);


function Searchby({ title, menu, setMenu, content }) {
    const [add, setAdd] = useState(false);


    const [opTions, setOptions] = useState(menu || [])



    useEffect(() => {
        setMenu(opTions);

        // eslint-disable-next-line
    }, [opTions])



    const [result, setResult] = useState(content?.slice(0, 5))


    useEffect(() => {
        if (add) {
            setResult(content);
        } else {
            setResult(content?.slice(0, 5))
        }


    }, [add, content]);
    return (<div className={cx("search-by")}>
        <p className={cx("title")}>{title}</p>
        <div className={cx("menu")}>
            {
                result?.map((item) => {

                    return (<div
                        className={cx("item")} key={item.details}
                        onClick={() => {
                            const index = opTions?.indexOf(item.details);

                            if (index === -1) {
                                setOptions(pre => [...pre, item.details])


                            } else {
                                setOptions(pre => {
                                    const index = opTions?.findIndex(i => i === item.details);
                                    const result = [...pre]
                                    result.splice(index, 1)
                                    return [...result];
                                })

                            }

                        }}

                    >

                        <div
                            className={cx("box")}
                            key={"box" + item.details}>
                            <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0"
                                className={cx("check-icon", opTions?.includes(item.details) ? "active" : "")}>
                                <g>
                                    <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                        <p >
                            {`${item.details}`}
                            {item.listProduct ? ` (${item.listProduct})` : ""}
                        </p>
                    </div>

                    )
                })
            }
        </div>
        {content?.length > 5 ? <div className={cx("add-item")} onClick={() => setAdd(pre => !pre)}>
            <div >{add ? "Thu Gọn" : "Thêm"}</div>
            <FontAwesomeIcon icon={faAngleDown}
                style={{ color: "#555", display: "block" }} />

        </div> : null}
    </div>);
}

export default memo(Searchby);
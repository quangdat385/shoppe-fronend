import className from 'classnames/bind';


import { useState, useRef } from "react";


import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import styles from './AdminContent.module.scss';



const cx = className.bind(styles)

const Content = () => {
    const [url, setUrl] = useState("");
    const wrapper = useRef();
    const SubBtn = useRef();



    function fetchFile(url) {
        fetch(url).then(res => res.blob()).then(file => {
            console.log(file);
            let tempUrl = URL.createObjectURL(file);
            const aTag = document.createElement("a");
            aTag.href = tempUrl;
            // eslint-disable-next-line
            aTag.download = url.replace(/^.*[\\\/]/, '');

            wrapper.current.appendChild(aTag);
            aTag.click();
            SubBtn.current.innerText = "Download File";
            URL.revokeObjectURL(tempUrl);
            aTag.remove();
        }).catch(() => {
            console.log("Failed to download file!");
            SubBtn.current.innerText = "Download File";
        });
    }


    const handlerSubmit = async (e) => {
        e.preventDefault();
        const result = await fetchFile(url);
        console.log(result);
    }


    return (
        <div className={cx('wrapper')}>
            <Container className={cx("content")} ref={wrapper}>
                <Row >
                    <Col sm={3} md={2}>
                        <form onSubmit={handlerSubmit} className={cx("d-flex justify-content-between h-100")} >
                            <input
                                type="url"
                                style={{
                                    height: "50px",
                                    width: "50vw",
                                }}
                                onChange={e => setUrl(e.target.value)}
                                value={url}
                            >

                            </input>
                            <button
                                type="submit"
                                style={{
                                    height: "50px",
                                    width: "300%",
                                }}
                                ref={SubBtn}

                            >submit</button>
                        </form>



                    </Col>
                    <Col sm={9} md={10}>
                        <Outlet />
                    </Col>

                </Row>

            </Container>
        </div>
    )
}


export default Content;

import className from 'classnames/bind';

import { Container, Col, Row } from "react-bootstrap"



import styles from './UserDetail.module.scss';

const cx = className.bind(styles)

function Bank() {
    return (<Container>
        <Row>
            <Col xs={12}>
                <div className={cx("bank-wrapper")}>

                    <h4 className={cx("bank")}>Tính Năng Này Đang Được Cập Nhật .Xin Vui Lòng Chờ...</h4>
                </div>
            </Col>
        </Row>
    </Container>);
}

export default Bank; 
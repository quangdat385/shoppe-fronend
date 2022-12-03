import className from 'classnames/bind';

import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import styles from './AdminContent.module.scss';

const cx = className.bind(styles)

const Content = () => {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx("content")} >
                <Row >
                    <Col sm={3} md={2}>

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

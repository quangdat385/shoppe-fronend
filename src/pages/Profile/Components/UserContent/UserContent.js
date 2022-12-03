import className from 'classnames/bind';

import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import styles from './UserContent.module.scss';
import UserSideBar from '../UserSideBar';

const cx = className.bind(styles)

const Content = () => {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('content')}>
                <Row >
                    <Col xs={6} sm={5} md={3} xl={2}>
                        <UserSideBar />
                    </Col>
                    <Col xs={12} sm={12} md={9} xl={10}>
                        <Outlet />
                    </Col>

                </Row>

            </Container>
        </div>
    )
}


export default Content;

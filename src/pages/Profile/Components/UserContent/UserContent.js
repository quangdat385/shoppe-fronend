import className from 'classnames/bind';

import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import styles from './UserContent.module.scss';
import UserSideBar from '../UserSideBar';

const cx = className.bind(styles)

const Content = ({ user }) => {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('content')}>
                <Row >
                    <Col xs={12} sm={6} md={5} lg={2}>
                        <UserSideBar user={user} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={10} id="user-content">
                        <Outlet />
                    </Col>

                </Row>

            </Container>
        </div>
    )
}


export default Content;

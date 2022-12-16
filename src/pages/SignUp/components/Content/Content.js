import PropTypes from 'prop-types';
import className from 'classnames/bind';
import styles from './Content.module.scss';
import Container from 'react-bootstrap/Container';



const cx = className.bind(styles)

function Content({ children }) {


    return (
        <div className={cx('wrapper')}>
            <Container className={cx('content')}>

                {children}


            </Container>
        </div>
    )


}

Content.propTypes = {
    children: PropTypes.node.isRequired,
};
export default Content;
import PropTypes from 'prop-types';
import className from 'classnames/bind';



import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

const cx = className.bind(styles)

function DefaultLayout({ children }) {



    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

DefaultLayout.prototype = {
    children: PropTypes.node.isRequired,
}


export default DefaultLayout;

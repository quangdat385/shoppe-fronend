import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { useEffect } from "react"


import { productsApiSlice } from '~/features/products/productsApiSlice';
import { productDetailsApiSlice } from "~/features/productDetails/productDetailSlice"
import { store } from '~/app/store';

import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

const cx = className.bind(styles);


function DefaultLayout({ children }) {
    useEffect(() => {
        store.dispatch(productsApiSlice.util.prefetch('getProducts', 'productsList', { force: true }))
        store.dispatch(productDetailsApiSlice.util.prefetch('getDetails', 'listDetail', { force: true }))

    }, []);



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

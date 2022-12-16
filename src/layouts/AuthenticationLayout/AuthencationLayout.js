import className from 'classnames/bind';



import styles from './AuthencationLayout.module.scss';

import AuthHeader from '~/layouts/AuthenticationLayout/AuthHeader'
import Footer from '~/layouts/components/Footer'


const cx = className.bind(styles)

function AuthencationLayout({ children, status }) {
    return (
        <div className={cx('wrapper')}>
            <AuthHeader status={status} />
            {children}
            <Footer />

        </div>
    );
}

export default AuthencationLayout;
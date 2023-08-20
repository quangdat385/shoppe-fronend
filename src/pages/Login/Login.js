import className from 'classnames/bind';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './Login.module.scss';
import Content from './components/Content'
import FormLogin from './components/FormLogin'


const cx = className.bind(styles)



function Login() {

    const { pathname } = useLocation();
    useEffect(() => {
        localStorage.setItem("shop-Page", JSON.stringify(pathname));
        // eslint-disable-next-line 
    }, [])

    return (
        <div className={cx('wrapper')}>
            <Content>
                <FormLogin />
            </Content>
        </div>
    )

}

export default Login;

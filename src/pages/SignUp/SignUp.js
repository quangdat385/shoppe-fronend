import className from 'classnames/bind';
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

import styles from './SignUp.module.scss';
import Content from './components/Content'
import FormSignUp from './components/FormSignUp'


const cx = className.bind(styles)





const SignUp = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        localStorage.setItem("shop-Page", JSON.stringify(pathname));
        // eslint-disable-next-line 
    }, [])
    return (
        <div className={cx('wrapper')}>
            <Content>
                <FormSignUp />
            </Content>
        </div>
    )
}

export default SignUp

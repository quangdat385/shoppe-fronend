import className from 'classnames/bind';


import styles from './Login.module.scss';
import Content from './components/Content'
import FormLogin from './components/FormLogin'


const cx = className.bind(styles)



function Login() {



    return (
        <div className={cx('wrapper')}>
            <Content>
                <FormLogin />
            </Content>
        </div>
    )

}

export default Login;

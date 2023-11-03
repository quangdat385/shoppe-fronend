import className from 'classnames/bind';

import styles from './SignUp.module.scss';
import Content from './components/Content'
import FormSignUp from './components/FormSignUp'


const cx = className.bind(styles)





const SignUp = () => {
    return (
        <div className={cx('wrapper')}>
            <Content>
                <FormSignUp />
            </Content>
        </div>
    )
}

export default SignUp

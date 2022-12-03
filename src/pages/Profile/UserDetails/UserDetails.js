import className from 'classnames/bind';

import styles from './UserDetail.module.scss';


const cx = className.bind(styles);

function UserDetails() {


    return (
        <div className={cx('wrapper')}>
            <h1>User Details</h1>
        </div>
    );
}

export default UserDetails;
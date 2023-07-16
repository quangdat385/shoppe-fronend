import className from 'classnames/bind';

import { Container, Col, Row } from "react-bootstrap"



import styles from './UserDetail.module.scss';

import { useRef, useState, Fragment, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { auth } from '~/until/fire';
import {


    RecaptchaVerifier,
    signInWithPhoneNumber,
} from 'firebase/auth';

import { useUpdateUserMutation } from "~/features/users/usersApiSlice"
import { selectCurrentToken } from "~/features/auth/authSlice";



import Avatar from '~/components/Avatar';


const cx = className.bind(styles);

function UserDetails({ user, setQuery }) {
    const PHONE_REGEX = /^[+?\s\- 0-9]{10,15}$/;
    const token = useSelector(selectCurrentToken);
    const [sex, setSex] = useState("")
    const changeAvatar = useRef();
    const [canSave, setCanSave] = useState(false);
    const [profileImg, setProfileImg] = useState();
    const [userName, setUserName] = useState(user?.user_name);
    const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
    const [date, setDate] = useState({});
    const [section, setSection] = useState("profile");
    const [result, setResult] = useState('');
    useEffect(() => {
        setUserName(user?.user_name)
    }, [user])
    const signin = async (number) => {
        const recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {


            },
            auth
        );
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, number, recaptchaVerifier);


    }
    const checkPhoneNumber = async () => {
        const phone = phoneNumber.length > 11 ? phoneNumber : `(+84)${phoneNumber.slice(1)}`;


        try {
            const result = await signin(phone);
            setResult(result);
            setSection("VERIFY_OTP");
        } catch (err) {
            console.log(err);
        }
    }

    const day = [], month = [], year = [];
    for (let i = 1; i < 32; i++) {
        day.push(i);
    }
    let dayNow = new Date(Date.now());
    console.log(dayNow.getFullYear())
    for (let i = 1; i <= 12; i++) {
        month.push(i);
    }

    for (let i = 1900; i <= dayNow.getFullYear(); i++) {
        year.push(i);
    }
    console.log(date)


    const [updateUser] = useUpdateUserMutation("updateUser");
    console.log(section)
    useEffect(() => {
        setCanSave(PHONE_REGEX.test(phoneNumber))
        // eslint-disable-next-line
    }, [phoneNumber])
    let content;
    if (section === "profile") {
        content = (<Container>
            <div className={cx('header')}>
                <div className={cx('title')}>Hồ Sơ Của Tôi</div>
                <div className={cx('paragraph')}>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>

            <Container className={cx('pt-5')}>
                <Row>
                    <Col lg={8}>
                        <Container className={cx('content')}>
                            <Row className={cx('pb-5')}>
                                <Col lg={3} className={cx("label")}>Tên đăng nhập</Col>
                                <Col lg={9} className={cx('input-wrapper')}>
                                    <input value={userName} type="text" className={cx('input')}
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                        }}
                                    />
                                    <div className={cx('input-label')}>Tên đăng nhập chỉ có thể thay đổi một lần</div>
                                </Col>
                            </Row>
                            <Row className={cx('pb-5')}>
                                <Col lg={3} className={cx("label")}>Tên</Col>
                                <Col lg={9} className={cx('input-wrapper')}>
                                    <input type="text" className={cx('input')} />

                                </Col>
                            </Row>
                            <Row className={cx('pb-5')}>
                                <Col
                                    lg={3} className={cx("label")}>Email</Col>
                                <Col lg={9} className={cx('input-wrapper')}>
                                    <div
                                        onClick={() => { setSection("email") }}
                                        className={cx('add')}>Thêm</div>
                                </Col>
                            </Row>
                            <Row className={cx('pb-5')}>
                                <Col

                                    lg={3} className={cx("label")}>Số điện thoại</Col>
                                <Col lg={9} className={cx('input-wrapper')}>
                                    <div
                                        onClick={() => { setSection("phone_number") }}
                                        className={cx('add')}>Thêm</div>
                                </Col>
                            </Row>
                            <Row className={cx('pb-5')}>
                                <Col lg={3} className={cx("label")}>Giới tính</Col>
                                <Col lg={9} className={cx('input-wrapper')}>
                                    <div className={cx('sex')}>
                                        {["male", "female", "others"].map(item => {
                                            return (<Fragment key={item}>
                                                <label htmlFor={item} className={cx('radio-box', item === sex ? "active" : "")}>
                                                    <input onChange={e => { setSex(e.target.value) }} id={item} type="radio" name='sex' value={item}></input>
                                                </label>

                                                <label className={cx('label-sex')} htmlFor={item}>{item === "male" ? "Nam" : item === "female" ? "Nữ" : "Khác"}</label>

                                            </Fragment>)

                                        })}

                                    </div>
                                </Col>
                            </Row>
                            <Row className={cx('pb-5')}>
                                <Col lg={3} className={cx("label")}>Ngày sinh</Col>
                                <Col lg={9} className={cx('input-wrapper')}>

                                    <select id="day" name="day" onChange={e => {
                                        setDate(pre => {
                                            return { ...pre, day: e.target.value }
                                        })
                                    }}

                                    >
                                        {
                                            day.map(item => {
                                                return <option key={item} value={item}>{item}</option>
                                            })
                                        }
                                    </select>

                                    <select id="month" name="month" onChange={e => {
                                        setDate(pre => {
                                            return { ...pre, month: e.target.value }
                                        })
                                    }}>

                                        {
                                            month.map(item => {
                                                return <option key={item} value={item}>{`Tháng ${item}`}</option>
                                            })
                                        }
                                    </select>

                                    <select id="year" name="year" onChange={e => {
                                        setDate(pre => {
                                            return { ...pre, year: e.target.value }
                                        })
                                    }}>

                                        {
                                            year.map(item => {
                                                return <option key={item} value={item}>{item}</option>
                                            })
                                        }
                                    </select>
                                </Col>
                            </Row>
                            <Row className="pb-5">
                                <Col lg={3} className={cx("label")}></Col>
                                <Col lg={9} className={cx('input-wrapper')}>

                                    <div className={cx("submit-btn")}>Lưu</div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col lg={4}>
                        <div className={cx("avatar-block")}>
                            <Avatar
                                width={30}
                                height={30}
                                className={cx('avatar')}
                                src={`http://localhost:3500/img/avatar/${user?.avatar[0]}`}
                                user={user?.user_name ? user.user_name : null}

                            />
                            <div className={cx("change-avatar")}>

                                <input

                                    onChange={e => setProfileImg(e.target.files)}
                                    type="file"
                                    ref={changeAvatar}
                                    accept=".jpg,.jpeg,.png"
                                ></input>
                                <div

                                    onClick={(e) => {
                                        e.stopPropagation()
                                        changeAvatar.current.click()
                                        console.log(profileImg)
                                    }}
                                    className={cx("change-btn")}>
                                    Chọn Ảnh
                                </div>
                                <div className={cx("limited")}>
                                    <div>Dung lượng tối đa :   1M</div>
                                    <div>Định dạng : .PJEG,.PNG...</div>
                                </div>
                                <button

                                    disabled={profileImg?.length >= 1 ? false : true}
                                    onClick={async () => {

                                        const UserForm = new FormData();

                                        const id = user.id;

                                        UserForm.append("avatar", profileImg[0])


                                        const result = await axios.patch(`http://localhost:3500/api/user/${id}/update/avatar`, UserForm, {
                                            headers: {
                                                "Content-Type": "multipart/form-data",
                                                'Authorization': `Bearer ${token}`
                                            }
                                        })
                                        if (result.status === 200) {
                                            setQuery(pre => {
                                                return { pre, update: true }
                                            })
                                        }

                                    }}>Cập Nhật</button>


                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </Container>)
    } else if (section === "phone_number") {
        content = (<Container>
            <div className={cx('header')}>
                <div className={cx('title')}>Chỉnh Sửa Số Điện Thoại</div>

            </div>
            <Container className={cx('pt-5')}>
                <Row>
                    <Col xs={12}>
                        <Container className={cx('content')}>
                            <Row className={cx('pb-5')}>
                                <Col lg={3} className={cx("label")}>Thêm số điện thoại mới</Col>
                                <Col lg={9} className={cx('input-wrapper')}>
                                    <input value={phoneNumber} type="tel" className={cx('input')}
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value);
                                        }}
                                        pattern={PHONE_REGEX}

                                    />

                                </Col>
                                <Col lg={9}>
                                    <div id="recaptcha-container" className="captcha"></div>
                                </Col>
                            </Row>

                            <Row className="pb-5">
                                <Col lg={3} className={cx("label")}></Col>
                                <Col lg={9} className={cx('input-wrapper')}>

                                    <button
                                        disabled={!canSave}
                                        onClick={checkPhoneNumber}
                                        className={cx("submit-btn", !canSave ? "disabled" : "")}

                                    >Tiếp Theo</button>
                                </Col>
                            </Row>
                            <Row>

                            </Row>
                        </Container>
                    </Col>

                </Row>
            </Container>
        </Container>)
    }



    return (
        <div className={cx('wrapper')}>
            {content}
        </div>
    );
}

export default UserDetails;
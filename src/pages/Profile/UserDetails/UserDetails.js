import className from 'classnames/bind';

import { Container, Col, Row } from "react-bootstrap"



import styles from './UserDetail.module.scss';

import { useRef, useState, Fragment, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { auth } from '~/until/fire';
import {

    signOut,
    RecaptchaVerifier,
    signInWithPhoneNumber,

} from 'firebase/auth';



import { useUpdatePhoneNumberMutation, useAddAddressMutation, useUpdateEmailMutation } from "~/features/users/usersApiSlice";
import { selectCurrentToken } from "~/features/auth/authSlice";



import Avatar from '~/components/Avatar';



const cx = className.bind(styles);

function UserDetails({ user, setQuery }) {
    const PHONE_REGEX = /^[+?\s\- 0-9]{10,15}$/;
    const EMAIL_REGEX = /^[a-z0-9._%+]+@[a-z0-9.]+\.[a-z]{2,4}$/;
    const token = useSelector(selectCurrentToken);
    const [sex, setSex] = useState("")
    const changeAvatar = useRef();
    const [canSave, setCanSave] = useState(false);
    const [profileImg, setProfileImg] = useState();
    const [userName, setUserName] = useState(user?.user_name || "");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || "");
    const [date, setDate] = useState({});
    const [timeZone, setTimeZone] = useState("");
    const [section, setSection] = useState("profile");
    const [result, setResult] = useState('');
    const [otp, setOtp] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [email, setEmail] = useState(user?.email || "");
    const [updateFields, setUpdateFields] = useState({});


    const [updatePhoneNumber] = useUpdatePhoneNumberMutation();
    const [updateEmailFn] = useUpdateEmailMutation();
    const [addAddress] = useAddAddressMutation("addAddress");
    useEffect(() => {
        setUserName(user?.user_name)
        setPhoneNumber(user?.phone_number)
        setEmail(user?.email)
    }, [user]);

    console.log(phoneNumber);

    useEffect(() => {
        if (userName !== user?.user_name && userName.length > 0) {
            setUpdateFields(pre => {
                return { ...pre, user_name: userName }
            })
        } else if (userName === user?.user_name) {
            setUpdateFields(pre => {
                delete pre.user_name
                return { ...pre }
            })
        }
        if (fullName.length > 0) {
            setUpdateFields(pre => {
                return { ...pre, full_name: fullName }
            })
        }

        if (sex.length > 0) {
            setUpdateFields(pre => {
                return { ...pre, gender: sex }
            })
        }
        if (date.month && date.day && date.year) {
            let birthday = `${date.month}/${date.day}/${date.year}`

            setUpdateFields(pre => {
                return { ...pre, birthday: birthday }
            })
        } else if (timeZone.length > 0) {
            setUpdateFields(pre => {
                return { ...pre, birthday: timeZone }
            })
        }
        // eslint-disable-next-line
    }, [userName, fullName, sex, date])

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
    const handleUpdateUser = async () => {
        try {
            const result = await addAddress({ id: user?.id, address: updateFields }).unwrap();

            setResult(result);
            setErrMsg("")
            setTimeZone("")
            setSection("profile")

        } catch (err) {
            if (!err.status) {

                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('All Field are required');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.status === 403) {
                setErrMsg('duplicated email');
            } else {
                setErrMsg(err.data?.message);
            }

        }
    }
    const updateEmail = async () => {
        try {
            const result = await updateEmailFn({ id: user.id, email: email }).unwrap();

            setResult(result);
            setErrMsg("")
            setSection("profile")

        } catch (err) {
            if (!err.status) {

                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('All Field are required');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.status === 403) {
                setErrMsg('duplicated email');
            } else {
                setErrMsg(err.data?.message);
            }

        }

    }
    const verifyOtp = async () => {
        const res = await result.confirm(otp);

        if (!res) return
        setOtp("")

        try {
            const result = await updatePhoneNumber({ id: user.id, phone_number: phoneNumber }).unwrap();
            signOut(auth)
            setResult(result);
            setErrMsg("")
            setSection("profile")

        } catch (err) {
            if (!err.status) {

                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Phone Number');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.status === 403) {
                setErrMsg('duplicated phone number');
            } else {
                setErrMsg(err.data?.message);
            }

        }
    }
    const day = [], month = [], year = [];
    for (let i = 1; i < 32; i++) {
        day.push(i);
    }
    let dayNow = new Date(Date.now());

    for (let i = 1; i <= 12; i++) {
        month.push(i);
    }

    for (let i = 1900; i <= dayNow.getFullYear(); i++) {
        year.push(i);
    }
    console.log(date)



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
                <Row className={cx('profile-box')}>
                    <Col xl={8} lg={9} md={12}>
                        <Container className={cx('content')}>
                            <Row className={cx('pb-5')}>
                                <Col xl={3} lg={4} md={4} xs={5} className={cx("label")}>Tên đăng nhập</Col>
                                <Col xl={9} lg={8} md={8} xs={7} className={cx('input-wrapper')}>
                                    {user?.isUserName === true ? <div>{userName}</div> : <>
                                        <input value={userName} type="text" className={cx('input')}
                                            onChange={(e) => {
                                                setUserName(e.target.value);
                                            }}
                                        />
                                        <div className={cx('input-label')}>Tên đăng nhập chỉ có thể thay đổi một lần</div>
                                    </>}

                                </Col>
                            </Row>
                            <Row className={cx('pb-5')}>
                                <Col lg={4} xl={3} md={4} xs={5} className={cx("label")}>Tên</Col>
                                <Col lg={8} xl={9} md={8} xs={7} className={cx('input-wrapper')}>
                                    <input
                                        value={fullName}
                                        type="text"
                                        className={cx('input')}
                                        onChange={(e) => {
                                            setFullName(e.target.value)
                                        }}
                                    />

                                </Col>
                            </Row>
                            <Row className={cx('pb-5')}>
                                <Col
                                    xl={3} lg={4} md={4} xs={5} className={cx("label")}>Email</Col>
                                <Col xl={9} lg={8} md={8} xs={7} className={cx('input-wrapper')}>
                                    <div
                                        onClick={() => { setSection("email") }}
                                        className={cx('add')}>Thêm</div>
                                </Col>
                            </Row>
                            <Row className={cx('pb-5')}>
                                <Col

                                    xl={3} lg={4} md={4} xs={5} className={cx("label")}>Số điện thoại</Col>
                                <Col xl={9} lg={8} md={8} xs={7} className={cx('input-wrapper')}>
                                    <div
                                        onClick={() => { setSection("phone_number") }}
                                        className={cx('add')}>Thêm</div>
                                </Col>
                            </Row>
                            <Row className={cx('pb-5')}>
                                <Col xl={3} lg={4} md={4} xs={5} className={cx("label")}>Giới tính</Col>
                                <Col xl={9} lg={8} md={8} xs={7} className={cx('input-wrapper')}>
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
                                <Col xl={3} lg={4} md={4} xs={5} className={cx("label")}>Ngày sinh</Col>
                                <Col xl={9} lg={8} md={8} xs={7} className={cx('input-wrapper')}>
                                    <div className={cx('on-mobile')}>
                                        <input
                                            value={timeZone}
                                            type="date"
                                            className={cx('input')}
                                            onChange={(e) => { setTimeZone(e.target.value) }}
                                        />
                                    </div>
                                    <div className={cx("on-pc")}>
                                        <select id="day" name="day" onChange={e => {
                                            setDate(pre => {
                                                return { ...pre, day: e.target.value }
                                            })
                                        }}

                                        >
                                            <option value="" defaultValue>Ngày</option>
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
                                            <option value="" defaultValue>Tháng</option>
                                            {
                                                month.map(item => {
                                                    return <option key={item} value={item}>{`${item}`}</option>
                                                })
                                            }
                                        </select>

                                        <select id="year" name="year" onChange={e => {
                                            setDate(pre => {
                                                return { ...pre, year: e.target.value }
                                            })
                                        }}>
                                            <option value="" defaultValue>Năm</option>
                                            {
                                                year.map(item => {
                                                    return <option key={item} value={item}>{item}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                </Col>
                            </Row>
                            <Row className="pb-5">
                                <Col xl={3} lg={4} md={4} xs={5} className={cx("label")}></Col>
                                <Col xl={9} lg={8} md={8} xs={7} className={cx('input-wrapper')}>

                                    <div
                                        className={cx("submit-btn")}
                                        onClick={handleUpdateUser}
                                    >Lưu</div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col xl={4} lg={3} md={12}>
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
                                <Col xl={3} lg={4} xs={5} className={cx("label")}>Thêm số điện thoại mới</Col>
                                <Col xl={9} lg={8} xs={7} className={cx('input-wrapper')}>
                                    <input value={phoneNumber} type="tel" className={cx('input')}
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value);
                                        }}
                                        pattern={PHONE_REGEX}
                                        autoComplete={false}
                                    />
                                    <div id="recaptcha-container" className={cx("captcha")}></div>
                                </Col>
                            </Row>

                            <Row className="pb-5">
                                <Col xl={3} lg={4} xs={5} className={cx("label")}></Col>
                                <Col xl={9} lg={8} xs={7} className={cx('input-wrapper')}>

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
    } else if (section === "VERIFY_OTP") {
        content = (<Container>
            <div className={cx('header')}>
                <div className={cx('title')}>Nhập Mã OTP</div>

            </div>
            <Container className={cx('pt-5')}>
                <Row>
                    <Col xs={12}>
                        <Container className={cx('content')}>
                            <Row className={cx('pb-5')}>
                                <Col xl={3} lg={4} xs={5} className={cx("label")}>Nhập mã OTP</Col>
                                <Col xl={9} lg={8} xs={7} className={cx('input-wrapper')}>
                                    {errMsg.length > 0 ? <div className={cx('errMsg')} >{errMsg}</div> : ""}
                                    <input value={otp} type="text" className={cx('input')}
                                        onChange={(e) => {
                                            setOtp(e.target.value);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-5">
                                <Col xl={3} lg={4} xs={5} className={cx("label")}></Col>
                                <Col xl={9} lg={8} xs={7} className={cx('input-wrapper')}>
                                    <button
                                        disabled={!otp.length}
                                        onClick={verifyOtp}
                                        className={cx("submit-btn", otp.length < 0 ? "disabled" : "")}
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
    } else if (section === "email") {
        content = (<Container>
            <div className={cx('header')}>
                <div className={cx('title')}>Chỉnh Sửa Email</div>

            </div>
            <Container className={cx('pt-5')}>
                <Row>
                    <Col xs={12}>
                        <Container className={cx('content')}>
                            <Row className={cx('pb-5')}>
                                <Col xl={3} lg={4} xs={5} className={cx("label")}>Nhập email</Col>
                                <Col xl={9} lg={8} xs={7} className={cx('input-wrapper')}>
                                    {errMsg.length > 0 ? <div className={cx('errMsg')} >{errMsg}</div> : ""}
                                    <input
                                        pattern={EMAIL_REGEX}
                                        value={email}
                                        type="text"
                                        className={cx('input')}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-5">
                                <Col xl={3} lg={4} xs={5} className={cx("label")}></Col>
                                <Col xl={9} lg={8} xs={7} className={cx('input-wrapper')}>
                                    <button
                                        disabled={!EMAIL_REGEX.test(email)}
                                        onClick={updateEmail}
                                        className={cx("submit-btn", !EMAIL_REGEX.test(email) ? "disabled" : "")}
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
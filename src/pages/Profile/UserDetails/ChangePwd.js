import className from 'classnames/bind';

import { Container, Col, Row } from "react-bootstrap"
import { useState, useEffect } from 'react';

import { useChangePasswordMutation } from "~/features/users/usersApiSlice"

import styles from './UserDetail.module.scss';


const cx = className.bind(styles)

function ChangePwd({ user }) {
    const PWD_REG = /^[0-9a-z!@#]{9,12}$/;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validPwd, setValidPwd] = useState("");
    const [validconfirmPassword, setValidConfirmPassword] = useState("");
    const [canSave, setCanSave] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [updatePassword] = useChangePasswordMutation("changePassword");
    const [isActive, setIsActive] = useState(false);


    useEffect(() => {
        if (PWD_REG.test(password)) {
            setValidPwd(true)
        } else {
            setValidPwd(false)
        }
        if (PWD_REG.test(confirmPassword)) {
            setValidConfirmPassword(true)
        } else {
            setValidConfirmPassword(false)
        }
        // eslint-disable-next-line
    }, [password, confirmPassword]);

    useEffect(() => {
        if (validPwd && validconfirmPassword) {
            setCanSave(true)
        } else {
            setCanSave(false)
        }
    }, [validPwd, validconfirmPassword]);

    const changePassWord = async () => {
        setIsActive(true)
        if (password !== confirmPassword) {
            setErrMsg("Mật Khẩu và mật khẩu xác nhận phải giống nhau")
            return
        } else {
            setErrMsg("")
        }
        try {
            await updatePassword({ id: user?.id, password: password }).unwrap();

            setErrMsg("Thay đổi mật khẩu thành công")


        } catch (err) {
            if (!err.status) {

                setErrMsg('Không kết nối đuọc');
            } else if (err.status === 500) {
                setErrMsg('Mật khẩu thay đổi không thành công');
            } else {
                setErrMsg(err.data?.message);
            }

        }
    }

    return (
        <Container className={cx("change-password")}>
            <Container>
                <div className={cx('header')}>
                    <div className={cx('title')}>Thay đổi password</div>

                </div>
                <Container className={cx('pt-5')}>
                    <Row>
                        <Col xs={12}>
                            <Container className={cx('content')}>
                                <Row className={cx('pb-5')}>
                                    <Col lg={3}></Col>
                                    <Col lg={9} className={cx('input-wrapper')}>
                                        {
                                            errMsg?.length > 0 &&
                                            <div className={cx("errMsg")}>
                                                {errMsg}
                                            </div>
                                        }

                                    </Col>
                                </Row>
                                <Row className={cx('pb-5')}>

                                    <Col lg={3} md={4} xs={5} className={cx("label")}>Mật Khẩu</Col>
                                    <Col lg={9} md={8} xs={7} className={cx('input-wrapper')}>

                                        <div className={cx("py-1")}>Mật khẩu gồm :chữ hoa chữ thường và  !@#$ (8-12 ký tự)</div>
                                        <input
                                            name="password"
                                            required
                                            type="password"
                                            placeholder="Enter your password"
                                            autoComplete="on"
                                            autoFocus={true}
                                            pattern={PWD_REG}
                                            suggested="current-password"
                                            value={password}
                                            className={cx('input')}
                                            onChange={e => { setPassword(e.target.value.trim()) }}
                                        />
                                        {
                                            (!validPwd && isActive) && <div className={cx('invalid')}>Vui lòng điền trường này !!!</div>
                                        }

                                    </Col>
                                </Row>
                                <Row className={cx('pb-5')}>
                                    <Col lg={3} md={4} xs={5} className={cx("label")}>Xác nhận mât khẩu</Col>
                                    <Col lg={9} md={8} xs={7} className={cx('input-wrapper')}>
                                        <div className={cx("py-1")}>Mật khẩu gồm :chữ hoa chữ thường và  !@#$ (8-12 ký tự)</div>
                                        <input
                                            name="password"
                                            required
                                            type="password"
                                            placeholder="Enter you confirm password"
                                            autoComplete="on"
                                            pattern={PWD_REG}
                                            suggested="current-password"
                                            value={confirmPassword}
                                            className={cx('input')}
                                            onChange={e => { setConfirmPassword(e.target.value.trim()) }}
                                        />
                                        {(!validconfirmPassword && isActive) &&
                                            <div className={cx('invalid')}>Vui lòng điền trường này !!!</div>
                                        }
                                    </Col>
                                </Row>

                                <Row className="pb-5">
                                    <Col lg={3} md={4} xs={5} className={cx("label")}></Col>
                                    <Col lg={9} md={8} xs={7} className={cx('input-wrapper')}>

                                        <button
                                            disabled={!canSave}
                                            onClick={changePassWord}
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
            </Container>


        </Container>



    );
}

export default ChangePwd;
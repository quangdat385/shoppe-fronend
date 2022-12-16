import className from 'classnames/bind';

import { useState, useRef, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';

import styles from './FormSignUp.module.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import { auth } from '~/until/fire';
import {


    RecaptchaVerifier,
    signInWithPhoneNumber,
} from 'firebase/auth';

import { useRegisterMutation, useLoginAndUpdateMutation } from '~/features/auth/authApiSlice';
import { setCredentials } from '~/features/auth/authSlice';




import usePersist from '~/hooks/usePersists';






const cx = className.bind(styles)
function FormLoginByPhone() {
    const [phone_number, setPhoneNumber] = useState('');

    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('')



    const [register,] = useRegisterMutation()
    const [loginAndUpdate,] = useLoginAndUpdateMutation()


    const [otp, setOtp] = useState("");

    const [step, setStep] = useState("INPUT_PHONE_NUMBER");


    const [result, setResult] = useState('');



    const [validated, setValidated] = useState(false);

    const [persist, setPersist] = usePersist();
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();



    const userRef = useRef();
    const buttonRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();




    useEffect(() => {
        setErrMsg('');
    }, [phone_number, otp]);

    useEffect(() => {
        userRef.current.focus()

    }, []);


    const handlePerSitInput = () => setPersist(pre => !pre);
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

    const handleSignin = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            return;

        }
        setValidated(true);

        const phone = phone_number.length > 11 ? phone_number : `(+84)${phone_number.slice(1)}`;


        try {
            const result = await signin(phone);
            setResult(result);
            setStep("VERIFY_OTP");
        } catch (err) {
            setErrMsg(err)
        }








    }
    const verifyOtp = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();

        }

        setValidated(true);
        event.preventDefault();



        try {
            const res = await result.confirm(otp);

            setResult(res)



            const data = await register({ phone_number: phone_number }).unwrap();
            console.log(data);

            const { next_step, accessToken } = data;
            if (next_step === "views") {
                dispatch(setCredentials({ accessToken }));
                setPhoneNumber("");
                setConfirmPassword("");
                setPassword('');
                setOtp("");
                setStep("INPUT_PHONE_NUMBER");
                navigate("/user/profile");

            } else {
                setResult(data)
                setStep("UPDATE_PASSWORD");
                setOtp("")
            }


        } catch (err) {
            setErrMsg(err.message);

        }
    }
    const updatePassword = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        const method = result.method_login;

        const id = result?.data.userId;
        if (password !== confirm_password) {

            setErrMsg("Password and Confirm Password must be same value")
            return;
        }
        setValidated(true);
        event.preventDefault();
        try {

            await loginAndUpdate({ id: id, method: method, password: password }).unwrap();
            setPassword('');
            setConfirmPassword('')
            setValidated(false);
            navigate("/user/profile")

        } catch (err) {
            if (!err.status) {

                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.status === 403) {
                setErrMsg('Password Not Hash');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }


    }



    const errClass = errMsg ? "errmsg" : "d-none";

    return (<>

        <div ref={errRef} className={cx(`${errClass}`)}>{errMsg}</div>
        {
            step === "INPUT_PHONE_NUMBER" &&
            <Form noValidate validated={validated} onSubmit={handleSignin} >
                <Row className="mb-4">
                    <Form.Group as={Col} sm='12' controlId="phone-number" >

                        <Form.Control
                            ref={userRef}
                            name="phone"
                            required
                            type="tel"
                            placeholder="Enter Your Phone Number"
                            autoComplete="on"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}


                        />
                        <div className="padding-invalid"></div>
                        <Form.Control.Feedback type="invalid">Vui lòng điền vào mục này</Form.Control.Feedback>
                    </Form.Group>
                </Row >
                <Row>
                    <Col size={12} sm={12}>
                        <div id="recaptcha-container" className="captcha"></div>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Form.Group >
                        <Form.Check

                            label="Trust This Device"
                            checked={persist}
                            onChange={handlePerSitInput}
                        />
                    </Form.Group>

                </Row>
                <Row>
                    <Col size={12} sm={12}>
                        <Button
                            type="submit"
                            className="login-button"
                            ref={buttonRef}

                        >
                            TIẾP THEO
                        </Button>
                    </Col>
                </Row>


            </Form>
        }
        {
            step === "VERIFY_OTP" &&
            <Form noValidate validated={validated} onSubmit={verifyOtp} >
                <Row className="mb-4">
                    <Form.Group as={Col} sm='12' controlId="opt" >

                        <Form.Control

                            name="otp"
                            required
                            type="otp"
                            placeholder="Enter OTP"
                            autoFocus
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}


                        />
                        <div className="padding-invalid"></div>
                        <Form.Control.Feedback type="invalid">Vui lòng điền vào mục này</Form.Control.Feedback>
                    </Form.Group>
                </Row >


                <Row className="mb-4">
                    <Form.Group >
                        <Form.Check

                            label="Trust This Device"
                            checked={persist}
                            onChange={handlePerSitInput}
                        />
                    </Form.Group>

                </Row>
                <Row>
                    <Col size={12} sm={12}>
                        <Button type="submit" className="login-button" >Xác Nhận</Button>
                    </Col>
                </Row>


            </Form>
        }{
            step === "UPDATE_PASSWORD" && <Form noValidate validated={validated} onSubmit={updatePassword} >
                <Row className="mb-4">
                    <Form.Group as={Col} sm='12' controlId="password" >
                        <Form.Control

                            name="password"
                            required
                            type="password"
                            placeholder="Enter Your Password"
                            autoComplete="on"
                            autoFocus
                            value={password}

                            suggested="current-password"
                            onChange={(e) => setPassword(e.target.value)}


                        />
                        <div className="padding-invalid"></div>
                        <Form.Control.Feedback type="invalid">Vui lòng điền vào mục này</Form.Control.Feedback>
                    </Form.Group>
                </Row >
                <Row className="mb-4">
                    <Form.Group as={Col} sm='12' controlId="confirm-password" >

                        <Form.Control

                            name="password"
                            required
                            suggested="current-password"
                            type="password"

                            placeholder="Enter Your Confirm Password"
                            autoComplete="on"

                            value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}


                        />

                        <div className="padding-invalid"></div>
                        <Form.Control.Feedback type="invalid">Vui lòng điền vào mục này</Form.Control.Feedback>
                    </Form.Group>
                </Row >


                <Row className="mb-4">
                    <Form.Group >
                        <Form.Check

                            label="Trust This Device"
                            checked={persist}
                            onChange={handlePerSitInput}
                        />
                    </Form.Group>

                </Row>
                <Row>
                    <Col size={12} sm={12}>
                        <Button
                            type="submit"
                            className="login-button"


                        >
                            TIẾP THEO
                        </Button>
                    </Col>
                </Row>


            </Form>
        }



    </>);
}

export default memo(FormLoginByPhone);

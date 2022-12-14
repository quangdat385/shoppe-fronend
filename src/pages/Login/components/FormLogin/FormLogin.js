
import className from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from './FormLogin.module.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';


import { setCredentials } from '~/features/auth/authSlice';
import { useLoginMutation } from '~/features/auth/authApiSlice';
import { facebook, google, loginSocial } from '~/until/fire';
import usePersist from '~/hooks/usePersists';
import FormLoginByPhone from './FomLoginByPhone';
import ForfotPassword from './ForgotPassword';







const cx = className.bind(styles);


function FormLogin() {
    const PHONE_REGEX = /^[0-9]+$/;
    const MAIL_REGEX = /^[a-z0-9._%+]+@[a-z0-9.]+\.[a-z]{2,4}$/;

    const [validated, setValidated] = useState(false);
    const [user_name, setUserName] = useState('');

    const metho_login = PHONE_REGEX.test(user_name) ? "phone_number" : MAIL_REGEX.test(user_name) ? "email" : "user_name";;

    const [password, setPassword] = useState('');
    const [persist, setPersist] = usePersist();
    const [status, setStatus] = useState("login");

    const [errMsg, setErrMsg] = useState('');



    const userRef = useRef();


    const errRef = useRef();


    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [login, { isLoading }] = useLoginMutation();


    useEffect(() => {
        userRef.current.focus()

    }, []);

    // eslint-disable-next-line
    useEffect(() => {
        setErrMsg('');
        // eslint-disable-next-line
    }, [user_name, password]);


    const handleUserInput = e => {
        const user = e.target.value;
        setUserName(user.trim())
    };
    const handlePwdInput = e => {
        const pass = e.target.value;
        setPassword(pass.trim());
    };
    const handlePerSitInput = () => setPersist(pre => !pre);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        event.preventDefault();
        try {
            const { accessToken } = await login({ [metho_login]: user_name, password }).unwrap()


            dispatch(setCredentials({ accessToken }));


            setUserName('');
            setPassword('');
            navigate("/user/profile");
        } catch (err) {
            if (!err.status) {

                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        };

    };
    const handlerSociolLogin = async (provider) => {
        const result = await loginSocial(provider);
        console.log(result)

    }
    const errClass = errMsg ? "errmsg" : "d-none";
    let content;
    if (isLoading) {
        content = <PulseLoader />
    } else if (status === "login") {


        content = (<>
            <div ref={errRef} className={cx(`${errClass}`)}>{errMsg}</div>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
                <Row className="mb-4">
                    <Form.Group as={Col} sm='12' controlId="user" >

                        <Form.Control
                            ref={userRef}
                            required
                            type="text"
                            placeholder="Email/Phone Number/User Name"
                            autoComplete="of"
                            value={user_name}
                            onChange={handleUserInput}
                            autoFocus


                        />
                        <div className="padding-invalid"></div>
                        <Form.Control.Feedback type="invalid">Vui lòng điền vào mục này</Form.Control.Feedback>
                    </Form.Group>
                </Row >

                <Row className="mb-4">
                    <Form.Group as={Col} sm={12} controlId="password" >

                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            suggested="current-password"
                            value={password}
                            onChange={handlePwdInput}

                        />
                        <div className="padding-invalid"></div>
                        <Form.Control.Feedback type="invalid">Vui lòng điền vào mục này</Form.Control.Feedback>
                    </Form.Group>

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
                        <Button type="submit" className="login-button">ĐĂNG NHẬP</Button>
                    </Col>
                </Row>


            </Form>
            <Container fluid>

                <Row>
                    <Col
                        className="d-flex justify-content-between align-items-center"
                        size={12}
                        sm={12}
                        style={
                            {
                                paddingLeft: 0,
                                paddingRight: 0
                            }
                        }

                    >
                        <Button
                            className="fs-5 text-primary  my-3 bg-transparent border-0"
                            onClick={() => setStatus("forgot password")}
                        >
                            Quên mật khẩu
                        </Button>

                        <Button
                            className="fs-5 text-primary  my-3 bg-transparent border-0"
                            onClick={() => setStatus("login by SMS")}

                        >
                            Đăng nhập với SMS
                        </Button>

                    </Col>

                </Row>

            </Container>

        </>
        )

    } else if (status === "login by SMS") {
        content = <FormLoginByPhone setStatus={setStatus} />
    } else if (status === "forgot password") {
        content = <ForfotPassword setStatus={setStatus} />
    }


    return (

        <div className={cx('wrapper')}>
            <Container fluid>
                <Row >
                    <Col lg={6} md="auto" className={cx('d-none d-lg-block')}>

                    </Col>
                    <Col lg={6} md={12} sm={12}>
                        <div className={cx('form-login')}>
                            <div className={cx('content')}>
                                <Container fluid>
                                    <Row className="px-5 py-4" >
                                        <Col size={12} sm={12}>
                                            <div className={cx('header')}>
                                                <div className={cx('text')}>{status === "forgot password" ? "Mật Khẩu ?" : "Đăng Nhập"}</div>
                                                <div className={cx('main')}>
                                                    <div className={cx('banner')} >
                                                        Đăng nhập với mă QR
                                                    </div>
                                                    <a className={cx('code-qr')} href="/" >
                                                        <svg width="40" height="40" fill="none" ><g clipPath="url(#clip0)"><path fillRule="evenodd" clipRule="evenodd" d="M18 0H0v18h18V0zM3 15V3h12v12H3zM18 22H0v18h18V22zm-3 15H3V25h12v12zM40 0H22v18h18V0zm-3 15H25V3h12v12z" fill="#EE4D2D"></path><path d="M37 37H22.5v3H40V22.5h-3V37z" fill="#EE4D2D"></path><path d="M27.5 32v-8h-3v8h3zM33.5 32v-8h-3v8h3zM6 6h6v6H6zM6 28h6v6H6zM28 6h6v6h-6z" fill="#EE4D2D"></path><path fill="#fff" d="M-4.3 4l44 43.9-22.8 22.7-43.9-44z"></path></g><defs><clipPath id="clip0">
                                                            <path fill="red" d="M0 0h40v40H0z"></path></clipPath></defs>
                                                        </svg>
                                                    </a>
                                                </div>

                                            </div>
                                        </Col>


                                    </Row>
                                    <Row className="px-5 pb-4 " >
                                        <Col size={12} sm={12}>
                                            <div className="login-body">

                                                {content}
                                                <Container fluid>
                                                    <Row>
                                                        <Col
                                                            className="d-flex justify-content-center align-items-center"
                                                            size={12}
                                                            sm={12}
                                                            style={
                                                                {
                                                                    paddingLeft: 0,
                                                                    paddingRight: 0,
                                                                    paddingBottom: "1.4rem",
                                                                }
                                                            }
                                                        >
                                                            <div className={cx('seprate-1')}></div>
                                                            <div className={cx('seprate-2')}>HOẶC</div>
                                                            <div className={cx('seprate-3')}></div>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col
                                                            size={12}
                                                            sm={12}
                                                            className="d-flex justify-content-center align-items-center"
                                                            style={
                                                                {
                                                                    paddingLeft: 0,
                                                                    paddingRight: 0,

                                                                }
                                                            }
                                                        >
                                                            <Button className="m-1  flex-grow-1 d-flex justify-content-center align-items-center" as="a"
                                                                variant="outline-secondary"
                                                                onClick={() => handlerSociolLogin(facebook)}
                                                            >
                                                                <div className={cx('fa-icon')}></div>
                                                                <div className="fs-4 d-inline ms-2 ">Facebook</div>
                                                            </Button>
                                                            <Button className="m-1 btn-outline-secondary flex-grow-1 d-flex justify-content-center align-items-center" as="a"
                                                                variant="outline-secondary"
                                                                onClick={() => handlerSociolLogin(google)}

                                                            >
                                                                <div className={cx('google-icon')}></div>
                                                                <div className="fs-4 d-inline ms-2">Google</div>
                                                            </Button>
                                                            <Button className="m-1 btn-outline-secondary flex-grow-1 d-flex justify-content-center align-items-center" as="a"
                                                                variant="outline-secondary"
                                                            >
                                                                <div className={cx('apple-icon')}></div>
                                                                <div className="fs-4 d-inline ms-2">Apple</div>
                                                            </Button>
                                                        </Col>

                                                    </Row>

                                                </Container>

                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col
                                            size={12}
                                            sm={12}
                                            className="d-flex justify-content-center align-items-center"
                                            style={
                                                {
                                                    paddingLeft: 0,
                                                    paddingRight: 0,

                                                }
                                            }
                                        >
                                            <span className="fs-5 text-black-50">Bạn mới biết đến shoopee</span> <Link className={cx("sign-up", "fs-5")} to="/signup" >Đăng Ký</Link>
                                        </Col>
                                    </Row>

                                </Container>


                            </div>
                        </div>



                    </Col>
                </Row>
            </Container >
        </div>






    );
}

export default FormLogin;


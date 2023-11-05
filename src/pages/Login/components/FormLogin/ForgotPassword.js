import className from 'classnames/bind';

import { useState, useRef, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';

import styles from './FormLogin.module.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import { auth } from '~/until/fire';
import {


  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import AuthModal from '../AuthModal';
import {


  useConfirmPasswordMutation,
  useForgotPasswordMutation
} from '~/features/auth/authApiSlice';
import { setCredentials } from '~/features/auth/authSlice';




import usePersist from '~/hooks/usePersists';






const cx = className.bind(styles)
function FormLoginByPhone({ setStatus }) {
  const PHONE_REGEX = /^[+?\s\- 0-9]{10,15}$/
  const [phone_number, setPhoneNumber] = useState('');

  const [validPhone, setValidPhone] = useState(false);

  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('')

  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState('');





  const [confirm] = useConfirmPasswordMutation();
  const [forgotPassword] = useForgotPasswordMutation();


  const [otp, setOtp] = useState("");

  const [step, setStep] = useState("INPUT_PHONE_NUMBER");


  const [result, setResult] = useState('');



  const [validated, setValidated] = useState(false);

  const [persist, setPersist] = usePersist();
  const [errMsg, setErrMsg] = useState('');

  const errRef = useRef();



  const userRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {

    setValidPhone(PHONE_REGEX.test(phone_number))
    // eslint-disable-next-line 
  }, [phone_number])

  useEffect(() => {
    setErrMsg('');
  }, [phone_number, otp]);

  useEffect(() => {
    userRef?.current?.focus()

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
  const canSave = validPhone ? true : false;
  const handleSignin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    setValidated(true);

    try {
      const result = await confirm({ phone_number: phone_number }).unwrap();
      setUser(result)
      setResult(result);
      setModalShow(true);
      setValidated(false);


    } catch (err) {
      if (!err.status) {

        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Phone Number');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }





  }
  const verifyOtp = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;

    }

    setValidated(true);




    try {

      const res = await result.confirm(otp);

      if (!res) return

      setOtp("");
      setStep("UPDATE_PASSWORD");






    } catch (err) {
      console.error(err)

      setErrMsg(err?.data.message)
      errRef.current.focus();

    }
  }
  const updatePassword = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }




    if (password !== confirm_password) {

      setErrMsg("Password and Confirm Password must be same value")
      return;
    }
    setValidated(true);

    try {






      const { accessToken } = await forgotPassword({ id: user?.userId, method: "phone_number", password: password });
      dispatch(setCredentials({ accessToken }));
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');

      setStep('INPUT_PHONE_NUMBER');

      let term = JSON.parse(localStorage.getItem("path_name"));
      const partern = /^\/home\/\d{1}\/sort$/
      if (partern.test(term)) {
        return navigate(`${term}?byCollection=0`);
      }
      navigate(`${term}`)

    } catch (err) {
      if (!err.status) {

        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing value');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }


  }



  const errClass = errMsg ? "errmsg" : "d-none";

  return (<>
    <AuthModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      signin={signin}
      captcha="true"
      setResult={setResult}
      phone={phone_number}
      setStep={setStep}

    />
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
              disabled={!canSave}

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
    <Container fluid >
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


  </>);
}

export default memo(FormLoginByPhone);

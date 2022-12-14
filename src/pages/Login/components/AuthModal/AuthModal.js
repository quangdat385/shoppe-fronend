import className from 'classnames/bind'


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import styles from './AuthModal.module.scss';


const cx = className.bind(styles)

const AuthModal = ({ signin, setResult, phone, setStep, onHide, captcha, ...props }) => {

    const handleSubmit = async () => {


        const phone_number = phone.length > 11 ? phone : `(+84)${phone.slice(1)}`;


        try {
            const result = await signin(phone_number);
            setResult(result);
            setStep("VERIFY_OTP");
            onHide()
        } catch (err) {

        }

    }

    return (
        <div className={cx('wrapper')}>
            <Modal
                className={cx('content')}
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"

            >
                <Modal.Header >
                    <Modal.Title >
                        Bạn thực sự muốn gửi OTP ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        {captcha && <div id="recaptcha-container" className="captcha"></div>}
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Container fluid>

                        <Row>
                            <Col
                                className={cx("me-1 p-1 border-0")}
                                as={Button} onClick={handleSubmit}
                                style={{ backgroundColor: "#ee4d2d" }}

                            >
                                Gửi OTP
                            </Col>
                            <Col
                                className={cx("me-1 p-1 border-0")}
                                style={{ backgroundColor: "#ee4d2d" }}
                                as={Button}
                                xm={6}
                                onClick={onHide}>
                                Từ Chối
                            </Col>
                        </Row>
                    </Container>

                </Modal.Footer>
            </Modal>
        </div>


    )
}


export default AuthModal;
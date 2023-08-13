import axios from "axios";
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col } from "react-bootstrap";

import styles from './UserDetail.module.scss';
import { useState, useEffect } from 'react';


import { useAddAddressMutation, useDeleteAddressMutation } from "~/features/users/usersApiSlice";
import UpdateAddress from "./UpdateAddress";





const cx = className.bind(styles)

function Address({ user }) {
    const navigate = useNavigate()
    const [hidden, setHidden] = useState(false);
    const [visible, setVisible] = useState(false);
    const [typeAddress, setTypeAddress] = useState("");
    const [deFault, setDeFault] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setward] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState({});
    const [valid, setValid] = useState({ fullName: false, phoneNumber: false, address: false });
    const [check, setCheck] = useState(false);
    const [addressId, setAddressId] = useState("");
    const [errMsg, setErrMsg] = useState("")


    const userHomeAddress = user.address.filter(item => item.typeAddress === "Nhà Riêng");
    const userOfficeAddress = user.address.filter(item => item.typeAddress === "Văn Phòng");



    const [addAddress] = useAddAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();
    useEffect(() => {
        setAddress(pre => {
            return { ...pre, fullName, phoneNumber, typeAddress, deFault }
        })
    }, [fullName, phoneNumber, deFault, typeAddress])

    useEffect(() => {
        if (fullName === "") {
            setValid(pre => {

                return { ...pre, fullName: false }
            })
        } else {
            setValid(pre => {

                return { ...pre, fullName: true }
            })
        }
        if (phoneNumber === "") {
            setValid(pre => {

                return { ...pre, phoneNumber: false }
            })
        } else {
            setValid(pre => {

                return { ...pre, phoneNumber: true }
            })
        }
        if (ward === "" || district === "" || province === "") {
            setValid(pre => {

                return { ...pre, address: false }
            })

        } else {
            setValid(pre => {

                return { ...pre, address: true }
            })
        }
    }, [fullName, phoneNumber, ward, district, province])

    const provincesAPI = (api) => {
        return axios.get(api)
            .then((response) => {

                setProvinces(response.data)
            });
    }
    const districtsAPI = (api) => {
        return axios.get(api)
            .then((response) => {

                setDistricts(response?.data?.districts)
            });
    }
    const wardAPI = (api) => {
        return axios.get(api)
            .then((response) => {

                setWards(response?.data?.wards)
            });
    }
    useEffect(() => {
        provincesAPI('https://provinces.open-api.vn/api/?depth=1');

    }, [])
    useEffect(() => {
        if (province !== "") {

            districtsAPI(`https://provinces.open-api.vn/api/p/${province}/?depth=2`);
        }

    }, [province])

    useEffect(() => {
        if (district !== "") {

            wardAPI(`https://provinces.open-api.vn/api/d/${district}/?depth=2`);
        }
    }, [district]);

    const handleUpdateAddress = async () => {


        setCheck(true);
        let check = Array.from(Object.values(valid)).some(item => item === false)
        if (check) {
            console.log("Invalid");
            return
        }

        try {
            await addAddress({ id: user.id, address: address }).unwrap();
            setErrMsg("");
            navigate("/user/profile");
        } catch (err) {
            if (!err.status) {

                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('all fields are required');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
        }

    }



    return (<Container className={cx("address-wrapper")}>
        <Container>
            <div className={cx('header')}>
                <div className={cx('title')}>Địa Chỉ Của Tôi</div>
                <div
                    className={cx('button')}
                    onClick={() => setHidden(true)}
                >{`+  Thêm địa chỉ mới`}</div>
                <UpdateAddress addressId={addressId} user={user} hidden={visible} setHidden={setVisible} type="Nhà Riêng" />
                <div
                    className={cx('modal-address', hidden ? "" : "hidden")}

                >
                    <div onClick={(e) => {
                        e.stopPropagation()
                        setCheck(false)
                        setHidden(false)
                    }} className={cx('layout')}></div>
                    <div className={cx('input-box')}>
                        <div className={cx('heading')}>Địa chỉ mới</div>
                        <div className={cx('errMsg')}>{errMsg}</div>
                        <div className={cx('input-group')}>
                            <input
                                value={fullName}
                                onChange={e => {
                                    setFullName(e.target.value)

                                }
                                }
                                placeholder='Họ và Tên'
                                name="full-name" type="text" className={cx('input-item', (valid.fullName === false && check === true) ? "isInValid" : "")}>

                            </input>
                            <input
                                value={phoneNumber}
                                placeholder='Số điện thoại'
                                name="phone-number"
                                type="tel"
                                className={cx('input-item', (valid.phoneNumber === false && check === true) ? "isInValid" : "")}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value)

                                }}
                            >

                            </input>
                        </div>
                        <div className={cx('input-group')}>
                            <select
                                onChange={e => {
                                    setProvince(e.target.value)
                                    let term = provinces.filter(item => item.code === Number(e.target.value))[0]?.name
                                    setAddress(pre => {
                                        return { ...pre, province: term }
                                    })
                                }}
                                name="province" className={cx('input-select')}>
                                <option defaultValue value="">Tỉnh</option>
                                {provinces?.map((item) => {
                                    return <option key={item.name} value={item.code}>{item.name}</option>
                                })}
                            </select>
                            <select
                                onChange={e => {
                                    setDistrict(e.target.value)
                                    let term = districts.filter(item => item.code === Number(e.target.value))[0]?.name
                                    setAddress(pre => {
                                        return { ...pre, district: term }
                                    })

                                }}
                                name="district"
                                className={cx('input-select')}>
                                <option defaultValue value="">Huyện</option>
                                {districts?.map((item) => {
                                    return <option key={item.name} value={item.code}>{item.name}</option>
                                })}
                            </select>
                            <select
                                onChange={e => {
                                    setward(e.target.value)
                                    setAddress(pre => {
                                        return { ...pre, ward: wards[e.target.value]?.name }
                                    })
                                }}
                                name="ward" className={cx('input-select')}>
                                <option defaultValue value="">Xã</option>
                                {wards?.map((item, index) => {
                                    return <option key={item.name} value={index}>{item.name}</option>
                                })}
                            </select>
                            <div className={cx("invalid", (valid.address === false && check === true) ? "isInValid" : "")} >Xin vui lòng nhập Tỉnh/Thành Phô ,Huyện/Quận Và Xã/Phường</div>
                        </div>
                        <div className={cx('input-group')}>
                            <input
                                onChange={e => {
                                    setAddress(pre => {
                                        return { ...pre, details: e.target.value }
                                    })
                                }}
                                name="birthplace-detail"
                                className={cx('input-item-1')}
                                placeholder='Địa chỉ cụ thể'
                            ></input>
                        </div>
                        <div className={cx('input-group', "flex-start")}>
                            <div className={cx('type-of-address')}>
                                Loại địa chỉ:
                            </div>
                            {["Nhà Riêng", "Văn Phòng"].map((item) => {
                                return <div key={item} onClick={() => setTypeAddress(item)} className={cx('input-btn', item === typeAddress ? "active" : "")}>{item}</div>
                            })}

                        </div>
                        <div className={cx('input-group', "flex-start")}>
                            <input
                                value={deFault}
                                onChange={(e) => {

                                    setDeFault(e.target.checked)
                                }}
                                id="save-default" className={cx('save-default')} name="save-default" type="checkbox"></input>
                            <label htmlFor='save-default'>Đặt làm địa chỉ mặc định</label>
                        </div>
                        <div className={cx('input-group', "flex-end")}>
                            <div
                                onClick={() => {
                                    setCheck(false)
                                    setHidden(false)
                                }}
                                className={cx('input-button')}
                            >
                                Trở lại</div>
                            <div
                                onClick={handleUpdateAddress}
                                className={cx('input-button', "primary")}
                            >Hoàn thành</div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={cx('address-box')}>
                {user.address.length > 0 ?
                    <div className={cx('have-address')}>
                        <Container className={cx('pt-5')}>
                            <Row>
                                <Col xs={12}>Địa Chỉ Nhà</Col>

                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <ul className={cx('address-list')}>
                                        {userHomeAddress.map(item => {
                                            return <li key={item._id}>
                                                <div className={cx('address-item')}>
                                                    <p>
                                                        {`- ${item.details} ,${item.ward} ,${item.district} ,${item.province} .
                                                        Điện thoại : ${item.phoneNumber} .
                                                        `}
                                                    </p>
                                                </div>
                                                <div className={cx('btn-wrapper')}>
                                                    <div
                                                        onClick={() => {
                                                            setAddressId(item._id)
                                                            setVisible(true)
                                                        }}
                                                        className={cx("update-address")}
                                                    >Sửa</div>
                                                    <div
                                                        onClick={async () => {

                                                            try {
                                                                await deleteAddress({ id: user.id, addressId: item._id }).unwrap();

                                                                navigate("/user/profile");
                                                            } catch (err) {
                                                                console.log(err)
                                                            }
                                                        }}
                                                        className={cx("update-address")}
                                                    >Xóa</div>
                                                </div>

                                            </li>
                                        })}
                                    </ul>
                                </Col>

                            </Row>
                            <Row className={cx("pt-4")}>
                                <Col xs={12}>Địa Chỉ Văn Phòng</Col>
                                <Col xs={12}>
                                    <ul className={cx('address-list')}>
                                        {userOfficeAddress.map(item => {
                                            return <li key={item._id}>
                                                <div className={cx('address-item')}>
                                                    <p>
                                                        {`- ${item.details} ,${item.ward} ,${item.district} ,${item.province} .
                                                        Điện thoại : ${item.phoneNumber} .
                                                        `}
                                                    </p>
                                                </div>
                                                <div className={cx('btn-wrapper')}>
                                                    <div
                                                        onClick={() => {
                                                            setAddressId(item._id)
                                                            setVisible(true)
                                                        }}
                                                        className={cx("update-address")}
                                                    >Sửa</div>
                                                    <div
                                                        onClick={async () => {

                                                            try {
                                                                await deleteAddress({ id: user.id, addressId: item._id }).unwrap();

                                                                navigate("/user/profile");
                                                            } catch (err) {
                                                                console.log(err);
                                                            }
                                                        }}
                                                        className={cx("update-address")}
                                                    >Xóa</div>
                                                </div>

                                            </li>
                                        })}
                                    </ul>
                                </Col>
                            </Row>
                        </Container>
                    </div> :
                    <div className={cx('no-address')}>
                        <svg fill="none" viewBox="0 0 121 120" className={cx('address-icon')}>
                            <path d="M16 79.5h19.5M43 57.5l-2 19" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            </path>
                            <path d="M56.995 78.791v-.001L41.2 38.195c-2.305-5.916-2.371-12.709.44-18.236 1.576-3.095 4.06-6.058 7.977-8 5.061-2.5 11.038-2.58 16.272-.393 3.356 1.41 7 3.92 9.433 8.43v.002c2.837 5.248 2.755 11.853.602 17.603L60.503 78.766v.001c-.617 1.636-2.88 1.643-3.508.024Z" fill="#fff" stroke="#BDBDBD" strokeWidth="2">
                            </path>
                            <path d="m75.5 58.5 7 52.5M13 93h95.5M40.5 82.5 30.5 93 28 110.5" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M44.5 79.5c0 .55-.318 1.151-1.038 1.656-.717.502-1.761.844-2.962.844-1.2 0-2.245-.342-2.962-.844-.72-.505-1.038-1.105-1.038-1.656 0-.55.318-1.151 1.038-1.656.717-.502 1.761-.844 2.962-.844 1.2 0 2.245.342 2.962.844.72.505 1.038 1.105 1.038 1.656Z" stroke="#BDBDBD" strokeWidth="2">
                            </path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M48.333 68H18.5a1 1 0 1 0 0 2h30.667l-.834-2Zm20.5 2H102a1 1 0 0 0 0-2H69.667l-.834 2Z" fill="#BDBDBD">
                            </path>
                            <path d="M82 73h20l3 16H84.5L82 73ZM34.5 97H76l1.5 13H33l1.5-13ZM20.5 58h18l-1 7h-18l1-7Z" fill="#E8E8E8">
                            </path>
                            <path clipRule="evenodd" d="M19.5 41a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM102.5 60a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="#E8E8E8" strokeWidth="2"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M93.5 22a1 1 0 0 0-1 1v3h-3a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2h-3v-3a1 1 0 0 0-1-1Z" fill="#E8E8E8">
                            </path>
                            <circle cx="58.5" cy="27" r="7" stroke="#BDBDBD" strokeWidth="2">
                            </circle>
                        </svg>
                        <div >Bạn chưa có địa chỉ</div>
                    </div>
                }



            </div>
        </Container>

    </Container>);
}

export default Address;
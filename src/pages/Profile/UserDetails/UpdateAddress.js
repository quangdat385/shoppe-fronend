import axios from "axios";
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';



import { useUpdateAddressMutation } from "~/features/users/usersApiSlice";


import styles from './UserDetail.module.scss';
import { useState, useEffect, memo } from 'react';

const cx = className.bind(styles)

function UpdateAddress({ user, hidden, setHidden, type, addressId }) {
    const userAddress = user.address.filter(item => item.typeAddress === type)[0];

    const navigate = useNavigate()
    const [typeAddress, setTypeAddress] = useState(userAddress?.typeAddress);
    const [deFault, setDeFault] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setward] = useState("");
    const [fullName, setFullName] = useState(userAddress?.fullName);
    const [phoneNumber, setPhoneNumber] = useState(userAddress?.phoneNumber);
    const [details, setDetails] = useState(userAddress?.details);
    const [address, setAddress] = useState({});
    const [valid, setValid] = useState({ fullName: false, phoneNumber: false, address: false });
    const [check, setCheck] = useState(false);
    const [errMsg, setErrMsg] = useState("");




    useEffect(() => {
        setTypeAddress(userAddress?.typeAddress)
        setDeFault(userAddress?.deFault)
        setFullName(userAddress?.fullName)
        setPhoneNumber(userAddress?.phoneNumber)
        setDetails(userAddress?.details)
    }, [userAddress])


    const [updateAddress] = useUpdateAddressMutation();
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

    const handleUpdateAddress = () => {


        setCheck(true);
        let check = Array.from(Object.values(valid)).some(item => item === false)
        if (check) {
            console.log("Invalid");
            return
        }
        try {
            const result = updateAddress({ id: user.id, addressId, address: address }).unwrap;

            if (result) {
                navigate("/user/profile")
            }
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


    return (<div
        className={cx('modal-address', hidden ? "" : "hidden")}

    >
        <div onClick={(e) => {
            e.stopPropagation()
            setCheck(false)
            setHidden(false)
        }} className={cx('layout')}></div>
        <div className={cx('input-box')}>
            <div className={cx('heading')}>Địa chỉ mới</div>
            <div className={cx("errMsg")}>{errMsg}</div>
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
                    value={details}
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
                        setCheck(false);
                        setHidden(false);
                    }}
                    className={cx('input-button')}
                >
                    Trở lại</div>
                <div
                    onClick={handleUpdateAddress}
                    className={cx('input-button', "primary")}
                >Cập Nhật</div>
            </div>
        </div>
    </div>

    );
}

export default memo(UpdateAddress);
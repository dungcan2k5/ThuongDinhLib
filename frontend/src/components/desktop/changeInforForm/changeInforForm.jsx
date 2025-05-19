import React from "react";
import changeInfor from "../../../services/changeInfor";
import { useState, useEffect, useRef } from "react";
import './changeInforForm.css'

const ChangeInforForm = ({currentInfor, closeChangeInfor, onUpdateSuccess}) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const [nameMessage, setNameMessage] = useState('')
    const [phoneMessage, setPhoneMessage] = useState('')

    useEffect(() => {
        setName(currentInfor.name);
        setPhone(currentInfor.phone);
        setAddress(currentInfor.address);
    }, []);

    const isValidPhoneNumber = (phone) => {
        const regex = /^(0|\+84)(\d{9})$/;
        return regex.test(phone);
    };

    const changeInforSubmit = async (e) => {
        e.preventDefault();
        let flag = false
        if (!name.length) {
            setNameMessage('Vui lòng không để trống họ tên')
            flag = true
        }

        if (name && name.length < 5) {
            setNameMessage('Họ tên phải tối thiểu 5 kí tự')
            flag = true
        }

        if (!phone) {
            setPhoneMessage('Vui lòng không bỏ trống số điện thoại')
            flag = true
        }
        if (phone && !isValidPhoneNumber(phone)) {
            setPhoneMessage('Số điện thoại không hợp lệ')
            flag = true
        }
        if (flag) return
        try {
            const res = await changeInfor(name, address, phone);
            if (res) {
                console.log("Cập nhật thành công:", res);
                alert("Cập nhật thông tin thành công!");
                closeChangeInfor();
                onUpdateSuccess();
            }
        } catch(error) {
            console.error("Lỗi khi cập nhật:", error.message);
            alert("Cập nhật thất bại: " + error.message);
        }
    }

    
    return (
        <div className="changeInforForm">
            <div className="changeInforForm__overlay" onClick={closeChangeInfor}>//
                <div className="changeInforForm__content" onClick={(e) => e.stopPropagation()}>
                    <div className="changeInforForm__title">
                        <h2>Thay đổi thông tin cá nhân</h2>
                    </div>
                    <div className="changeInforForm__data">
                        <form action="" className="changeInforForm__form" onSubmit={changeInforSubmit}>
                            <div className="changeInforForm__item">
                                <h4>Họ tên</h4>
                                <input type="text" value={name} onChange={(e) => {setName(e.target.value)
                                    setNameMessage('');}}/>
                                <p className="changeInforForm__abort">{nameMessage}</p>
                            </div>
                            <div className="changeInforForm__item">
                                <h4>Địa chỉ</h4>
                                <input type="text" value={address} onChange={(e) => {setAddress(e.target.value)}}/>
                                <p className="changeInforForm__abort"></p>
                            </div>
                            <div className="changeInforForm__item">
                                <h4>Số điện thoại</h4>
                                <input type="text" value={phone} onChange={(e) => {setPhone(e.target.value)
                                    setPhoneMessage('');
                                }}/>
                                <p className="changeInforForm__abort">{phoneMessage}</p>
                            </div>
                            <button type="submit" className="changeInforForm__submit">Xác nhận</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeInforForm
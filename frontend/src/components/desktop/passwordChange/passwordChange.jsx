import React from "react";
import { useState, useEffect, useRef } from "react";
import './passwordChange.css'
import changePassword from "../../../services/changePassword";

const PasswordChange = ({closepasswordChange, onUpdateSuccess}) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const[currentPasswordMessage, setCurrentPasswordMessage] = useState('')
    const[newPasswordMessage, setnewPasswordMessage] = useState('')
    const[passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        let flag = false
        if (!currentPassword) {
            setCurrentPasswordMessage('Vui lòng nhập mật khẩu cũ')
            flag = true
        }
        
        if (!newPassword) {
            setnewPasswordMessage('Vui lòng nhập mật khẩu mới')
            flag = true
        }

        if (newPassword.length < 6) {
            setnewPasswordMessage('Mật khẩu phải có ít nhất 6 kí tự')
            flag = true
        }

        if (passwordConfirm != newPassword) {
            setPasswordConfirmMessage('Mật khẩu xác nhận không trùng khớp')
            flag = true
        }

        if (flag) return
        try {
            await changePassword(currentPassword, newPassword);
            closepasswordChange();
            alert('Mật khẩu đã được đổi')
        } catch (err) {
            alert('Mật khẩu cũ không đúng')
        }
    };

    return (
        <div className="passwordChange">
            <div className="passwordChange__overlay" onClick={closepasswordChange}>//
                <div className="passwordChange__content" onClick={(e) => e.stopPropagation()}>
                    <div className="passwordChange__title">
                        <h2>Đổi mật khẩu</h2>
                    </div>
                    <div className="passwordChange__data">
                        <form action="" className="passwordChange__form" onSubmit = {handleSubmit}>
                            <div className="passwordChange__item">
                                <h4>Mật khẩu cũ</h4>
                                <input type="password" value={currentPassword} onChange={(e) => {setCurrentPassword(e.target.value)
                                    setCurrentPasswordMessage('');}}/>
                                <p className="passwordChange__abort">{currentPasswordMessage}</p>
                            </div>
                            <div className="passwordChange__item">
                                <h4>Mật khẩu mới</h4>
                                <input type="password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)
                                    setnewPasswordMessage('')
                                }}/>
                                <p className="passwordChange__abort">{newPasswordMessage}</p>
                            </div>
                            <div className="passwordChange__item">
                                <h4>Xác nhận mật khẩu</h4>
                                <input type="password" value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)
                                    setPasswordConfirmMessage('');
                                }}/>
                                <p className="passwordChange__abort">{passwordConfirmMessage}</p>
                            </div>
                            <button type="submit" className="passwordChange__submit">Xác nhận</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordChange
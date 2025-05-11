import React, {useState, useEffect} from 'react'
import './RegisterFormDesktop.css'
import logo from '../../assets/logo/logo_trang.png'
import { Link } from 'react-router-dom'
import useValidator from '../../hooks/useValidator'
import register from '../../services/registerService'

const RegisterFormDesktop = () => {
 const[successMessage, setSuccessMessage] = useState('')
 const[membershipDate, setMembershipDate] = useState(new Date())
 const[message, setMessege] = useState('')
 const[cPass, setCPass] = useState('')
 const useValidatorOption = {
    rules: [
      useValidator.isRequired('[name="password"]'),
      useValidator.isRequired('[name="cPassword"]'),
      useValidator.isEmail('[name="email"]'),
      useValidator.isRequired('[name="name"]'),
      useValidator.isRequired('[name="email"]'),
      useValidator.minLength('[name="password"]', 6),
      useValidator.isPhone('[name="phone"]'),
      useValidator.isRequired('[name="phone"]'),
    ],
    onSubmit: async (values) => {
      setCPass('')
      if (values.password != values.cPassword) {
        setCPass('Mật khẩu xác nhận không trùng khớp')
        return
      }
      setSuccessMessage('')
      setMessege('')
      const {email, password, address, phone, name} = values;
      const result = await register(name, email, password, phone, address, membershipDate);
      console.log(result)
      if (result._id) {
        setSuccessMessage('Tài khoản đã được tạo thành công')
      }
      else {
        setMessege(result.message)
      }
    }
  };
  const {
      values,
      errors,
      handleChange,
      handleSubmit,
      isSubmitting,
  } = useValidator(useValidatorOption)

  return (
      <div className="register">
        <div className="register__left">
          <h2 className="register__title">Đăng kí tài khoản</h2>
          <p className="register__des">Thư viện sách Thượng Đình</p>
          <form onSubmit = {handleSubmit} action="" className="register__form">

            <input type="text" name = 'name' className="register__input" placeholder='Tên người dùng*' value={values.name || ''} onChange={handleChange}/>
            <p className="register__error">{errors.name}</p>

            <input type="password" name = 'password' className="register__input" placeholder='Mật khẩu*' value={values.password || ''} onChange={handleChange}/>
            <p className="register__error">{errors.password}</p>

            <input type="password" name = 'cPassword' className="register__input" placeholder='Xác nhận mật khẩu*' value={values.cPassword || ''} onChange={handleChange}/>
            <p className="register__error">{cPass}</p>

            <input type="text" name = 'email'  className="register__input" placeholder='Email*' value={values.email || ''} onChange={handleChange}/>
            <p className="register__error">{errors.email}</p>

            <input type="text" name = 'phone' className="register__input" placeholder='Số điện thoại' value={values.phone || ''} onChange={handleChange}/>
            <p className="register__error">{errors.phone}</p>

            <input type="text" name = 'address' className="register__input" placeholder='Địa chỉ' value={values.address || ''} onChange={handleChange}/>

            <div className="register__feature">
              <button type = 'submit'  className="register__confirm">Đăng kí</button>
              <div className='register--a'>
                <p className='register__success'>{successMessage}</p>
                <p className='register__abort'>{message}</p>
              </div>
              <p className="register__forgot">Đã có tài khoản?<Link to={'/login'} className="register__forgot">Đăng nhập ngay</Link></p>
            </div>
          </form>
        </div>
        <div className="register__right">
          <img src={logo} alt="" className='register__logo'/>
        </div>
      </div>
  )
}



export default RegisterFormDesktop
import React, {useState, useEffect} from 'react'
import './RegisterFormDesktop.css'
import logo from '../../assets/logo/logo_trang.png'
import { Link } from 'react-router-dom'
import useValidator from '../../hooks/useValidator'
import register from '../../services/registerService'

const RegisterFormDesktop = () => {
 const[successMessage, setSuccessMessage] = useState('')
 const[membershipDate, setMembershipDate] = useState(new Date())
 const[message, setMessage] = useState('')
 const[cPass, setCPass] = useState('')
 const useValidatorOption = {
    rules: [
      useValidator.isRequired('[name="password"]', 'Vui lòng không để trống mật khẩu'),
      useValidator.isRequired('[name="cPassword"]', 'Vui lòng xác nhận mật khẩu'),
      useValidator.isEmail('[name="email"]'),
      useValidator.isRequired('[name="name"]', 'Vui lòng nhập tên người dùng'),
      useValidator.isRequired('[name="email"]', 'vui lòng nhập email'),
      useValidator.isPhone('[name="phone"]'),
      useValidator.minLength('[name="password"]', 6),
      useValidator.minLength('[name="name"]', 5),
      useValidator.isRequired('[name="phone"]', 'Vui lòng nhập số điện thoại'),
    ],
    onSubmit: async (values) => {
      setCPass('')
      if (values.password != values.cPassword) {
        setCPass('Mật khẩu xác nhận không trùng khớp')
        return
      }
      setSuccessMessage('')
      setMessage('')
      const {email, password, address, phone, name} = values;
      try {
        const result = await register(name, email, password, phone, address, membershipDate);

        if (result._id) {
          setSuccessMessage('Tài khoản đã được tạo thành công');
        } else {
          setMessage('Đăng ký không thành công');
        }
      } catch (error) {
        setMessage(error.message || "Có lỗi xảy ra, vui lòng thử lại");
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

            <label htmlFor="" className='register__label'>Họ tên <span>*</span></label>
            <input type="text" name = 'name' className="register__input" value={values.name || ''} onChange={handleChange}/>
            <p className="register__error">{errors.name}</p>

            <label htmlFor="" className='register__label'>Mật khẩu <span>*</span></label>
            <input type="password" name = 'password' className="register__input" value={values.password || ''} onChange={handleChange}/>
            <p className="register__error">{errors.password}</p>

            <label htmlFor="" className='register__label'>Xác nhận mật khẩu <span>*</span></label>
            <input type="password" name = 'cPassword' className="register__input" value={values.cPassword || ''} onChange={handleChange}/>
            <p className="register__error">{cPass}</p>

            <label htmlFor="" className='register__label'>Email <span>*</span></label>
            <input type="text" name = 'email'  className="register__input" value={values.email || ''} onChange={handleChange}/>
            <p className="register__error">{errors.email}</p>

            <label htmlFor="" className='register__label'>Số điện thoại <span>*</span></label>
            <input type="text" name = 'phone' className="register__input" value={values.phone || ''} onChange={handleChange}/>
            <p className="register__error">{errors.phone}</p>

            <label htmlFor="" className='register__label'>Địa chỉ</label>
            <input type="text" name = 'address' className="register__input" value={values.address || ''} onChange={handleChange}/>

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
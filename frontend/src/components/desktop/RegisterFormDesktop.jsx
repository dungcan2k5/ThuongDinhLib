import React, {useState} from 'react'
import './RegisterFormDesktop.css'
import logo from '../../assets/logo/logo_trang.png'
import { Link } from 'react-router-dom'

const RegisterFormDesktop = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [address, setAddress] = useState('');
  const [membershipDate, setMembershipDate] = useState(new Date());
  const [phone, setPhone] = useState('');

  const [message, setMessage] = useState('');

  const [nameMessage, setNameMessage] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [cPassMessage, setCPassMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  

  const handleRegister = async(e) => {

    e.preventDefault();

    //reset message
    setNameMessage('');
    setPassMessage('');
    setCPassMessage('');
    setEmailMessage('');
    setMessage('');

    let flag = false

    if (!name) {
      setNameMessage("Vui Lòng nhập tên người dùng")
      flag = true
    }

    if (!password) {
      setPassMessage("Vui Lòng điền mật khẩu đăng ký")
      flag = true
    }

    if (!cPassword) {
      setCPassMessage("Vui Lòng xác nhận mật khẩu")
      flag = true
    } else {
      if (password != cPassword) {
        setCPassMessage('Mật khẩu xác nhận không trùng khớp')
        flag = true
      }
    }

    if (!email) {
      setEmailMessage("Vui Lòng nhập email")
      flag = true
    }

    if (!flag) {
      try {
      const res = await fetch('http://localhost:5000/api/customers/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password, phone, address, membershipDate})
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage("Đăng kí tài khoản thành công")
      }
      else {
        setEmailMessage('Email đã có người sử dụng')
      }
      } catch (error) {
      console.error('Lỗi kết nối:', error);
      setMessage('Không thể kết nối tới máy chủ');
      }
    }
  }


  return (
      <div className="register">
        <div className="register__left">
          <h2 className="register__title">Đăng kí tài khoản</h2>
          <p className="register__des">Thư viện sách Thượng Đình</p>
          <form onSubmit = {handleRegister} action="" className="register__form">

            <input type="text" className="register__input" placeholder='Tên người dùng*' value={name} onChange={(e) => setName(e.target.value)}/>
            <p className="register__error">{nameMessage}</p>

            <input type="password" className="register__input" placeholder='Mật khẩu*' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p className="register__error">{passMessage}</p>

            <input type="password" className="register__input" placeholder='Xác nhận mật khẩu*' value={cPassword} onChange={(e) => setCPassword(e.target.value)}/>
            <p className="register__error">{cPassMessage}</p>

            <input type="text" className="register__input" placeholder='Email*' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <p className="register__error">{emailMessage}</p>

            <input type="text" className="register__input" placeholder='Số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)}/>

            <div className="register__feature">
              <button type = 'submit'  className="register__confirm">Đăng kí</button>
              <p className='register__success'>{message}</p>
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
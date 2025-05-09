import React, {useState} from 'react'
import './RegisterFormDesktop.css'
import logo from '../../assets/logo/logo_trang.png'
import { Link } from 'react-router-dom'

const RegisterFormDesktop = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [message, setMessage] = useState('');

  const [nameMessage, setNameMessage] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [cPassMessage, setCPassMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleRegister = async(e) => {

     e.preventDefault();

    //reset message
    setNameMessage('');
    setPassMessage('');
    setCPassMessage('');
    setEmailMessage('');
    setMessage('');

    if (!name) {
      setNameMessage("Vui Lòng nhập tên người dùng")
    }

    if (!password) {
      setPassMessage("Vui Lòng điền mật khẩu đăng ký")
    }

    if (!cPassword) {
      setCPassMessage("Vui Lòng xác nhận mật khẩu")
    } else {
      if (password != cPassword) {
        setCPassMessage('Mật khẩu xác nhận không trùng khớp')
      }
    }

    if (!email) {
      setEmailMessage("Vui Lòng nhập email")
    }

    try {
      const res = await fetch('http://localhost:5000/api/customers/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password})
      });
      console.log(name)
      console.log(email)
      console.log(password)
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('OK');//
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 2000);
      }
      else {
        setMessage(data.message || 'Email đã có người sử dụng')
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      setMessage('Không thể kết nối tới máy chủ');
    }
  }


  return (
      <div className="register">
        {showSuccessPopup && (
          <div className="popup">
            <div className="popup__content">
              <p>🎉 Đăng ký thành công!</p>
            </div>
          </div>
        )}
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

            <input type="text" className="register__input" placeholder='Số điện thoại' value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}/>

            <div className="register__feature">
              <button type = "submit"  className="register__confirm">Đăng kí</button>
              <p>{message}</p>
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
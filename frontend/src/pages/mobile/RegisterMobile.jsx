import React from 'react'
import './RegisterMobile.css'

// import icon
// import user_Icon from '../../assets/user-solid.svg';
// import email_Icon from '../../assets/email-solid.svg';
// import lock_Icon from '../../assets/lock-solid.svg';


const LoginMobile = () => {
  return (
    <div class ="login">
      <div>
        <h2 class='login__title'>
          Sign in to MyLib
        </h2>

        <form class='login__form'>
          <div class='login__form--group' >
            <label class='login__form__label' htmlFor="email">Email address</label>
            <input class='login__form__input' type='email' placeholder='johncina@gmail.com'/>
            <span class='form--message' ></span>
          </div>

          <div class='login__form--group'>
            <label class='login__form__label' htmlFor="email">Password</label>
            <input class='login__form__input' type='password' placeholder='********'/>
            <span class='form--message' ></span>
          </div>

          <div class='login__form--group'>
            <button class='login__form__button'>Sign in</button>
          </div>
        </form>

        <div class='register'>
          <p>Haven't an account? Please <a class ='' href="/Register" >Sign up</a></p>
        </div>
      </div>
    </div>
  )
}

export default LoginMobile

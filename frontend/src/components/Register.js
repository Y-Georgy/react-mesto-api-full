import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleRegisterSubmit(e) {
    e.preventDefault()
    onSubmit({
      password,
      email,
    })
  }

  return (
    <form method="POST" className="form" name="register" onSubmit={handleRegisterSubmit}>
      <h3 className="form__title">Регистрация</h3>

      <input
        placeholder="Email"
        type="email"
        className="form__input"
        name="email"
        required
        minLength="2"
        maxLength="40"
        // id="email-input"
        value={email || ''}
        onChange={handleChangeEmail}
      />
      <span className="form__error email-input-error"></span>
      <input
        placeholder="Пароль"
        type="text"
        className="form__input"
        name="password"
        required
        minLength="8"
        maxLength="200"
        // id="password-input"
        value={password || ''}
        onChange={handleChangePassword}
      />
      <span className="form__error password-input-error"></span>
      <button type="submit" className="form__submit-button">
        Зарегистрироваться
      </button>
      <p className="form__text">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="form__link">
          Войти
        </Link>
      </p>
    </form>
  )
}

export default Register

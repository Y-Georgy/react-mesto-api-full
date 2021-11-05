import { useState } from 'react'

function Login({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleLoginSubmit(e) {
    e.preventDefault()
    onSubmit({
      password,
      email,
    })
  }

  return (
    <form method="POST" className="form" name="login" onSubmit={handleLoginSubmit}>
      <h3 className="form__title">Вход</h3>

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
        Войти
      </button>
    </form>
  )
}

export default Login

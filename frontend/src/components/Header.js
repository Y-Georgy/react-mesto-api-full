import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { useState } from 'react'

function Header({ userAuth, onSignOut }) {
  const [isActiveProfile, setActiveProfile] = useState(false)

  function handleBurgerMenuClick() {
    setActiveProfile(!isActiveProfile)
  }

  return (
    <>
      <Route exact path="/">
        <div className={`header__profile-top${isActiveProfile ? ' header__profile-top_opened' : ''}`}>
          <p className="header__email">{userAuth.email}</p>
          <Link to="/sign-in" className="header__link header__link_color_grey" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      </Route>

      <header className="header page__header">
        <img src={logo} alt="Логотип Mesto" className="header__logo" />

        <nav className="header__nav">
          <Switch>
            <Route path="/sign-up">
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </Route>
            <Route exact path="/">
              <div
                className={`header__burger-menu-button${isActiveProfile ? ' header__burger-menu-button_icon_close' : ''}`}
                onClick={handleBurgerMenuClick}
              />
              <div className="header__profile-right">
                <p className="header__email">{userAuth.email}</p>
                <Link to="/sign-in" className="header__link header__link_color_grey" onClick={onSignOut}>
                  Выйти
                </Link>
              </div>
            </Route>
          </Switch>
        </nav>
      </header>
    </>
  )
}

export default Header

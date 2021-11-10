import '../index.css'
import Loading from './Loading'
import { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/Api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmPopup from './ConfirmPopup'
import { initialCards, initialProfile } from '../utils/constants'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import { apiAuth } from '../utils/ApiAuth'
import ProtectedRoute from './ProtectedRoute'

function App() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [userAuth, setUserAuth] = useState({})
  const [toolTipMessage, setToolTipMessage] = useState('') // открывает попап и передает сообщение
  const [isErrorToolTip, setIsErrorToolTip] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  // Получение карточек и данных пользователя
  useEffect(() => {
    Promise.all([api.getProfile(), api.getCards()])
      .then(([profileInfo, cards]) => {
        setCurrentUser(profileInfo.data)
        setCards(cards.data)
      })
      .catch((err) => {
        setCurrentUser(initialProfile)
        setCards(initialCards)
        if (loggedIn) {
          setIsErrorToolTip(true)
          setToolTipMessage(`Данные профиля или карточек не обновились. ${err}`)
        }
      })
      .finally(() => setIsLoading(false))
  }, [loggedIn])

  useEffect(() => {
    api.getUsers()
      .then((users) => {
        console.log(users)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  // для попапа большого изображения
  const [selectedCard, setSelectedCard] = useState({})

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  // обработчики кнопок на странице
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [cardToDelete, setCardToDelete] = useState({})

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardDelete(card) {
    setIsConfirmPopupOpen(true)
    setCardToDelete(card)
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmPopupOpen(false)
    setSelectedCard({})
    setToolTipMessage('')
  }

  // обработчик клика закрытия попапов
  function handlePopupClose(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups()
    }
  }

  // обработчик обновления профиля
  function handleUpdateUser(profile) {
    api
      .addProfile(profile)
      .then((newProfile) => {
        setCurrentUser(newProfile.data)
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  // обработчик обновления аватарки
  function handleUpdateAvatar(avatar) {
    api
      .updateAvatar(avatar)
      .then((newProfile) => {
        setCurrentUser(newProfile.data)
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  // обработчик клика Escape
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (selectedCard.link | isEditProfilePopupOpen | isAddPlacePopupOpen | isEditAvatarPopupOpen | isConfirmPopupOpen) {
      document.addEventListener('keyup', closeByEscape)
    }
    return () => document.removeEventListener('keyup', closeByEscape)
  }, [selectedCard, isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isConfirmPopupOpen])

  // лайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((userId) => userId === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => (c._id === card._id ? newCard.data : c)))
      })
      .catch((rej) => console.log(rej))
  }

  // удаление карточки
  function handleConfirm() {
    api
      .deleteCard(cardToDelete._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== cardToDelete._id))
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  // ДОБАВЛЕНИЕ КАРТОЧКИ
  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  ///////////////////////////////////////////////////////////////

  // REGISTER
  function handleRegister({ password, email }) {
    apiAuth
      .register({
        password: password,
        email: email,
      })
      .then((res) => {
        setIsErrorToolTip(false)
        setToolTipMessage('Вы успешно зарегистрировались!')
        history.push('/sign-in')
      })
      .catch((err) => {
        setIsErrorToolTip(true)
        setToolTipMessage(err)
      })
  }

  // LOGIN
  function handleLogin({ password, email }) {
    apiAuth
      .login({
        password,
        email,
      })
      .then((res) => {
        if (res.message === 'Вход совершен успешно') {
          checkToken()
        }
      })
      .catch((err) => {
        setIsErrorToolTip(true)
        setToolTipMessage(err)
      })
  }

  // CHECK TOKEN
  function checkToken() {
    apiAuth
      .checkToken()
      .then((res) => {
        auth(res.data._id, res.data.email)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function auth(id, email) {
    setLoggedIn(true)
    setUserAuth({
      id,
      email,
    })
  }

  // ПЕРЕАДРЕСАЦИЯ ПОЛЬЗОВАТЕЛЕЙ
  useEffect(() => {
    loggedIn ? history.push('/') : history.push('/sign-in')
  }, [loggedIn])

  // ПРОВЕРКА ПОЛЬЗОВАТЕЛЯ ПРИ ВХОДЕ
  useEffect(() => {
    checkToken();
  }, [])

  // ВЫХОД ПОЛЬЗОВАТЕЛЯ
  function handleSignOutButtonClick() {
    exit()
  }
  function exit() {
    // localStorage.removeItem('token')
    setLoggedIn(false)
    setUserAuth({})
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userAuth={userAuth} onSignOut={handleSignOutButtonClick} />
        <InfoTooltip isError={isErrorToolTip} message={toolTipMessage} onClose={handlePopupClose} />

        <Switch>
          <Route path="/sign-up">
            <Register onSubmit={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onSubmit={handleLogin} />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            isLoading={isLoading}
            loading={Loading}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        {loggedIn && <Footer footerText="© 2021 Mesto Russia" />}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handlePopupClose} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handlePopupClose} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handlePopupClose} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={handlePopupClose} />
        <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={handlePopupClose} onConfirm={handleConfirm} />
      </CurrentUserContext.Provider>
    </div>
  )
}
export default App

import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  // подписка на контекст данных профиля
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__author">
          <img className="profile__avatar" src={currentUser.avatar} alt={`Аватар ${currentUser.name}`} />
          <div className="profile__overlay-avatar" onClick={onEditAvatar}></div>
          <div className="profile__text">
            <div className="profile__title-overlay">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="Редактировать"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main

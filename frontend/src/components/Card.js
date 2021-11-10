import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id
  const cardDeleteButtonClassName = `element__icon-delete${isOwn ? '' : ' element__icon-delete_hidden'}`

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((userId) => userId === currentUser._id)
  const cardLikeButtonClassName = `element__icon-like${isLiked ? ' element__icon-like_active' : ''}`

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="element">
      <div className="element__overlay-img" onClick={handleClick}></div>
      <img className="element__img" src={card.link} alt={card.name} />
      <div className="element__name-overlay">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-overlay">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравиться"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-quantity">{card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
    </li>
  )
}
export default Card

import React, { useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = useState(currentUser.name)
  const [description, setDescription] = useState(currentUser.about)

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        placeholder="Имя"
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        required
        minLength="2"
        maxLength="40"
        id="name-input"
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__error name-input-error"></span>
      <input
        placeholder="О себе"
        type="text"
        className="popup__input popup__input_type_job"
        name="about"
        required
        minLength="2"
        maxLength="200"
        id="job-input"
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className="popup__error job-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup

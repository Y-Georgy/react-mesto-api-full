import React, { useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name,
      link,
    })
  }

  useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  return (
    <PopupWithForm name="add" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        placeholder="Название"
        type="text"
        className="popup__input popup__input_type_title"
        name="name"
        required
        id="title-input"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__error title-input-error"></span>
      <input
        placeholder="Ссылка на картинку"
        type="url"
        className="popup__input popup__input_type_link"
        name="link"
        required
        id="link-input"
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup

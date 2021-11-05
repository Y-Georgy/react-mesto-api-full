import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef()

  function handleOnChangeAvatar(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleOnChangeAvatar}
    >
      <input
        ref={avatarRef}
        placeholder="Ссылка на фото"
        type="url"
        className="popup__input popup__input_type_link"
        name="avatar"
        required
        id="avatar-input"
      />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup

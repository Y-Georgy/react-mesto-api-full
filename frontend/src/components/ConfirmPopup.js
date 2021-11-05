import PopupWithForm from './PopupWithForm'

function ConfirmPopup({ isOpen, onClose, onConfirm }) {
  function handleSubmit(e) {
    e.preventDefault()
    onConfirm()
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmPopup

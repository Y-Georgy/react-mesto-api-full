function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image${Object.keys(card).length ? ' popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__image-container">
        <div className="popup__image-overlay">
          <img src={card.link} className="popup__image" alt={card.name} />
          <button type="button" className="popup__icon-close" aria-label="Закрыть" onClick={onClose}></button>
          <p className="popup__image-signature">{card.name}</p>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup

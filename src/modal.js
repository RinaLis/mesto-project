import { checkElementsState } from './validate.js'
import { nameAddPopup, linkAddPopup, selectors} from './constants.js';
import { addPlace } from './card.js';
import { handleSubmit } from './utils.js';
import { saveNewCard } from './api.js';


export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
}

const closePopupEsc = (evt) => {
  if (evt.key == 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup)
  }
}

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc)
}

export const openPopupAndCheck = (popup) => {
  openPopup(popup);
  const formElement = popup.querySelector('.popup__form');
  checkElementsState(formElement, selectors);
}

export const submitAddPlaceForm = (evt) => {
  function makeRequest() {
    return saveNewCard({ name: nameAddPopup.value, link: linkAddPopup.value }).then((card) => {
      addPlace({ name: card.name, link: card.link, likes: card.likes, id: card._id, owner: card.owner._id })
    });
  }
  handleSubmit(makeRequest, evt);
}

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});
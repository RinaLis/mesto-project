import { checkElementsState } from './validate.js'
import { popupAddContainer, nameEditPopup, statusEditPopup, popupEditContainer, nameAddPopup, linkAddPopup, formAddElement, selectors } from './constants.js';
import { addPlace } from './card.js';

export function submitEditProfileForm (evt, nameProfile, statusProfile) {
    evt.preventDefault();
    nameProfile.textContent = nameEditPopup.value;
    statusProfile.textContent = statusEditPopup.value;
    closePopup(popupEditContainer);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
}

const closePopupEsc = (evt) => {
  if (evt.key == 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup)
  } 
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc)
}

export function openPopupAndCheck(popup) {
  openPopup(popup);
  const formElement = popup.querySelector('.popup__form');
  checkElementsState(formElement, selectors);
  document.addEventListener('keydown', closePopupEsc)
}

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')){
      closePopup(popup);
    }
  });
});

export function submitAddPlaceForm(evt) {
  evt.preventDefault();

  addPlace(nameAddPopup.value, linkAddPopup.value);
  closePopup(popupAddContainer);
  formAddElement.reset()
}
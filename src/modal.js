import { checkElementsState } from './validate.js'
import { formAddElement, popupAddContainer, namePopup, statusPopup, popupEditContainer } from './index.js';
import { addPlace } from './card.js';

export function submitEditProfileForm (evt, nameProfile, statusProfile) {
    evt.preventDefault();
    nameProfile.textContent = namePopup.value;
    statusProfile.textContent = statusPopup.value;
    closePopup(popupEditContainer);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  if (popup.querySelector('.popup__set') !== null) {
    const fieldsetElement = popup.querySelector('.popup__set');
    checkElementsState(fieldsetElement);
  }
  popup.addEventListener('click', (evt) => {
    const withinBoundaries = evt.target.closest('.popup__main-container');
    evt.stopPropagation();
    if(withinBoundaries === popup.closest('.popup__main-container')) {
      closePopup(popup)
    }    
  })
  document.addEventListener('keydown', (evt) => {
    if (evt.key == 'Escape') {
      closePopup(popup)
    } 
  })
}

export function submitAddPlaceForm(evt) {
  evt.preventDefault();
  const nameAddPopup = formAddElement.querySelector('#place-name-input');
  const linkAddPopup = formAddElement.querySelector('#image-link-input');
  addPlace(nameAddPopup.value, linkAddPopup.value)
  closePopup(popupAddContainer)
  nameAddPopup.value = '';
  linkAddPopup.value = '';
}
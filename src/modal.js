import { checkElementsState } from './validate.js'
import { formSaveAddButton, formSaveEditButton, nameEditPopup, statusEditPopup, popupEditContainer, nameAddPopup, linkAddPopup, formAddElement, selectors } from './constants.js';
import { saveNewProfileInfo, saveNewCard } from './api.js';

export const submitEditProfileForm = (evt, nameProfile, statusProfile) => {
    evt.preventDefault();
    const name = nameEditPopup.value
    const status = statusEditPopup.value
    formSaveEditButton.textContent = 'Сохранение...'
    saveNewProfileInfo({name: name, status: status})
    .then(()=>{
      closePopup(popupEditContainer);
      nameProfile.textContent = name;
      statusProfile.textContent = status;
    })
    .then(()=>{
      formSaveEditButton.textContent = 'Сохранить'
    })
}

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

export const submitAddPlaceForm = (evt) => {
  evt.preventDefault();
  formSaveAddButton.textContent = 'Сохранение...'
  const name = nameAddPopup.value
  const link = linkAddPopup.value
  saveNewCard({name: name, link: link})
  .then(()=>{
    formAddElement.reset();
    formSaveAddButton.textContent = 'Создать'
  })
}
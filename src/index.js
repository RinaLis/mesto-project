import { toggleButtonState, checkInputValidity, enableValidation } from './validate.js';
import { submitEditProfileForm, submitAddPlaceForm, openPopup, closePopup } from './modal.js';
import { initialCards } from './constants.js';
import { addPlace } from './card.js';
import '../pages/index.css';

export const popupEditContainer = document.querySelector('.popup_view_edit');
const popupEditCloseButton = popupEditContainer.querySelector('.popup__close');
const formElement = popupEditContainer.querySelector('.popup__form')
export const namePopup = formElement.querySelector('#name-input');
export const statusPopup = formElement.querySelector('#status-input');
const formSaveButton = popupEditContainer.querySelector('.popup__button');

export const popupAddContainer = document.querySelector('.popup_view_place');
const popupAddCloseButton = popupAddContainer.querySelector('.popup__close');
export const formAddElement = popupAddContainer.querySelector('.popup__form')

const profileContainer = document.querySelector('.profile');
const profileEditButton = profileContainer.querySelector('.profile__edit');
const cardAddButton = profileContainer.querySelector('.profile__add');



profileEditButton.addEventListener('click', function () {
  const nameProfile = profileContainer.querySelector('.profile__name');
  const statusProfile = profileContainer.querySelector('.profile__status');

  namePopup.value = nameProfile.textContent;
  statusPopup.value = statusProfile.textContent;
  const formList = Array.from(formElement.querySelectorAll('.popup__input'))
  formList.forEach((formItem) => { 
    toggleButtonState(formList, formSaveButton); 
    checkInputValidity(formElement, formItem);
  })
  openPopup(popupEditContainer);

  formElement.addEventListener('submit', (evt) => {
    submitEditProfileForm(evt, nameProfile, statusProfile)
  });
})

popupEditCloseButton.addEventListener('click', function() {
    closePopup(popupEditContainer)
})



cardAddButton.addEventListener('click', function() {openPopup(popupAddContainer)})

popupAddCloseButton.addEventListener('click', function() {
  closePopup(popupAddContainer);
})

formAddElement.addEventListener('submit', submitAddPlaceForm);

  
initialCards.forEach(function(item) {
  addPlace(item.name, item.link);
})


enableValidation();
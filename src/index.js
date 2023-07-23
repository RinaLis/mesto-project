import { toggleButtonState, checkInputValidity, enableValidation } from './validate.js';
import { submitEditProfileForm, submitAddPlaceForm, openPopupAndCheck, closePopup } from './modal.js';
import { addPlace } from './card.js';
import '../pages/index.css';
import { nameProfile, statusProfile, initialCards, profileEditButton, nameEditPopup, statusEditPopup, formSaveEditButton, popupEditContainer,  formEdit, popupEditCloseButton, cardAddButton, formAddElement, popupAddCloseButton, popupAddContainer, selectors } from './constants.js';


function saveEditProfile () {
  nameEditPopup.value = nameProfile.textContent;
  statusEditPopup.value = statusProfile.textContent;
  const formList = Array.from(formEdit.querySelectorAll('.popup__input'))
  formList.forEach((formItem) => { 
    toggleButtonState(formList, formSaveEditButton, selectors); 
    checkInputValidity(formEdit, formItem, selectors);
  })
  openPopupAndCheck(popupEditContainer);
}

formEdit.addEventListener('submit', (evt) => {
  submitEditProfileForm(evt, nameProfile, statusProfile)
});

profileEditButton.addEventListener('click', saveEditProfile)

popupEditCloseButton.addEventListener('click', function() {
    closePopup(popupEditContainer)
})

cardAddButton.addEventListener('click', function() {openPopupAndCheck(popupAddContainer)})

popupAddCloseButton.addEventListener('click', function() {
  closePopup(popupAddContainer);
})

formAddElement.addEventListener('submit', submitAddPlaceForm);
  
initialCards.forEach(function(item) {
  addPlace(item.name, item.link);
})

enableValidation(selectors);
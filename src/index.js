import { toggleButtonState, checkInputValidity, enableValidation } from './validate.js';
import { submitEditProfileForm, submitAddPlaceForm, openPopupAndCheck, closePopup } from './modal.js';
import { nameProfile, statusProfile, profileEditButton, nameEditPopup, statusEditPopup, formSaveEditButton, popupEditContainer,  formEdit, popupEditCloseButton, cardAddButton, formAddElement, popupAddCloseButton, popupAddContainer, selectors, profileEditAva, popupAvaContainer, formAvaElement, profileAva, avaEditPopup, buttonSetAva} from './constants.js';
import { getInitialCards, getPersonInfo, setAvatar } from './api.js';
import '../pages/index.css';

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

const setNewAva = () => {
  buttonSetAva.textContent = 'Сохранение...'
  profileAva.setAttribute('src', avaEditPopup.value);
  setAvatar(avaEditPopup.value)
  .then(()=>{
    closePopup(popupAvaContainer)
  })
  .then(()=>{buttonSetAva.textContent = 'Сохранить'})
}
 
export const setProfileInfo = (name, status, link) => {
  nameProfile.textContent = name
  statusProfile.textContent = status
  profileAva.setAttribute('src', link)
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

profileEditAva.addEventListener('click', function() {openPopupAndCheck(popupAvaContainer)})

formAvaElement.addEventListener('submit', setNewAva);

getInitialCards()

export const personId = getPersonInfo()




enableValidation(selectors);
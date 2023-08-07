import { toggleButtonState, checkInputValidity, enableValidation } from './validate.js';
import { submitAddPlaceForm, openPopupAndCheck, closePopup } from './modal.js';
import {
  nameProfile, statusProfile, profileEditButton, nameEditPopup, statusEditPopup, formSaveEditButton, popupEditContainer, formEdit,
  cardAddButton, formAddElement, popupAddContainer, selectors, profileEditAva, popupAvaContainer,
  formAvaElement, profileAva, avaEditPopup, closeButtons
} from './constants.js';
import { getInitialCards, getPersonInfo, setAvatar, saveNewProfileInfo } from './api.js';
import { addPlace } from './card.js';
import { handleSubmit, catchError } from './utils.js';
import '../pages/index.css';

function saveEditProfile() {
  nameEditPopup.value = nameProfile.textContent;
  statusEditPopup.value = statusProfile.textContent;
  const formList = Array.from(formEdit.querySelectorAll('.popup__input'))
  formList.forEach((formItem) => {
    toggleButtonState(formList, formSaveEditButton, selectors);
    checkInputValidity(formEdit, formItem, selectors);
  })
  openPopupAndCheck(popupEditContainer);
}

const setNewAva = (evt) => {
  function makeRequest() {
    return setAvatar(avaEditPopup.value).then(() => {
      profileAva.setAttribute('src', avaEditPopup.value);
    });
  }
  handleSubmit(makeRequest, evt);
}

export const setProfileInfo = (name, status, link) => {
  nameProfile.textContent = name
  statusProfile.textContent = status
  profileAva.setAttribute('src', link)
}

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return saveNewProfileInfo({ name: nameEditPopup.value, status: statusEditPopup.value }).then((userData) => {
      setProfileInfo(userData.name, userData.about, userData.avatar)
    });
  }
  handleSubmit(makeRequest, evt);
}

formEdit.addEventListener('submit', handleProfileFormSubmit);

profileEditButton.addEventListener('click', saveEditProfile)

cardAddButton.addEventListener('click', function () { openPopupAndCheck(popupAddContainer) })

formAddElement.addEventListener('submit', submitAddPlaceForm);

profileEditAva.addEventListener('click', function () { openPopupAndCheck(popupAvaContainer) })

formAvaElement.addEventListener('submit', setNewAva);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

export const personId = Promise.all([getPersonInfo(), getInitialCards()])
  .then((value) => {
    return [value[0], value[1]]
  })
  .then(([userData, cards]) => {
    setProfileInfo(userData.name, userData.about, userData.avatar)
    cards.forEach(function (item) {
      addPlace({ name: item.name, link: item.link, likes: item.likes, id: item._id, owner: item.owner._id });
    })
    return (userData._id)
  })
  .catch(catchError);


enableValidation(selectors);
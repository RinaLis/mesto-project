export const initialCards = [ 
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

export const popupEditContainer = document.querySelector('.popup_view_edit');
export const popupEditCloseButton = popupEditContainer.querySelector('.popup__close');
export const formEdit = popupEditContainer.querySelector('.popup__form')
export const nameEditPopup = formEdit.querySelector('#name-input');
export const statusEditPopup = formEdit.querySelector('#status-input');
export const formSaveEditButton = popupEditContainer.querySelector('.popup__button');

export const popupAddContainer = document.querySelector('.popup_view_place');
export const popupAddCloseButton = popupAddContainer.querySelector('.popup__close');
export const formAddElement = popupAddContainer.querySelector('.popup__form')

export const profileContainer = document.querySelector('.profile');
export const profileEditButton = profileContainer.querySelector('.profile__edit');
export const cardAddButton = profileContainer.querySelector('.profile__add');

export const nameProfile = profileContainer.querySelector('.profile__name');
export const statusProfile = profileContainer.querySelector('.profile__status');
export const nameAddPopup = formAddElement.querySelector('#place-name-input');
export const linkAddPopup = formAddElement.querySelector('#image-link-input');

export const selectors = {
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__set',
  inputSelector: '.popup__input',
  buttonSubmit: '.popup__button',
  buttonState: 'popup__button_active',
  placeholderState: 'popup__placeholder_active',
  errorInput: 'popup__input_error',
  errorState: 'popup__input-error_active'
}
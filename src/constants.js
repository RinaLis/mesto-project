export const popupEditContainer = document.querySelector('.popup_view_edit-info');
export const popupEditCloseButton = popupEditContainer.querySelector('.popup__close');
export const formEdit = popupEditContainer.querySelector('.popup__form')
export const nameEditPopup = formEdit.querySelector('#name-input');
export const statusEditPopup = formEdit.querySelector('#status-input');
export const formSaveEditButton = popupEditContainer.querySelector('.popup__button');


export const popupAddContainer = document.querySelector('.popup_view_place');
export const popupAddCloseButton = popupAddContainer.querySelector('.popup__close');
export const formAddElement = popupAddContainer.querySelector('.popup__form');
export const formSaveAddButton = popupAddContainer.querySelector('.popup__button');

export const profileContainer = document.querySelector('.profile');
export const profileEditButton = profileContainer.querySelector('.profile__edit');
export const cardAddButton = profileContainer.querySelector('.profile__add');
export const profileEditAva = profileContainer.querySelector('.profile__edit-avatar');
export const profileAva = profileContainer.querySelector('.profile__image');

export const nameProfile = profileContainer.querySelector('.profile__name');
export const statusProfile = profileContainer.querySelector('.profile__status');
export const nameAddPopup = formAddElement.querySelector('#place-name-input');
export const linkAddPopup = formAddElement.querySelector('#image-link-input');

export const popupDeleteContainer = document.querySelector('.popup_view_delete');
export const buttonDelete = popupDeleteContainer.querySelector('.popup__button_view_delete');

export const popupAvaContainer = document.querySelector('.popup_view_edit-ava');
export const buttonSetAva = popupAvaContainer.querySelector('.popup__button');
export const formAvaElement = popupAvaContainer.querySelector('.popup__form');
export const avaEditPopup = popupAvaContainer.querySelector('#ava-input');

export const popupErrorContainer = document.querySelector('.popup_view_error');
export const textError = popupErrorContainer.querySelector('.popup__error');

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
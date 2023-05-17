const popupEditContainer = document.querySelector('.popup_view_edit');
const popupEditCloseButton = popupEditContainer.querySelector('.popup__close');
const formElement = popupEditContainer.querySelector('.popup__form')
const namePopup = formElement.querySelector('#name');
const statusPopup = formElement.querySelector('#status');
const formSaveButton = popupEditContainer.querySelector('.popup__button');

const popupAddContainer = document.querySelector('.popup_view_place');
const popupAddCloseButton = popupAddContainer.querySelector('.popup__close');
const formAddElement = popupAddContainer.querySelector('.popup__form')
const nameAddPopup = formAddElement.querySelector('#place');
const linkAddPopup = formAddElement.querySelector('#link');
const formAddButton = popupAddContainer.querySelector('.popup__button');

const profileContainer = document.querySelector('.profile');
const profileEditButton = profileContainer.querySelector('.profile__edit');
const cardAddButton = profileContainer.querySelector('.profile__add');
const nameProfile = profileContainer.querySelector('.profile__name');
const statusProfile = profileContainer.querySelector('.profile__status');

const bigCard = document.querySelector('.popup_view_card');
const popupImage = bigCard.querySelector('.popup__image');
const popupCaption = bigCard.querySelector('.popup__caption');
const cardCloseButton = bigCard.querySelector('.popup__close');

const cardsList = document.querySelector('.cards__items');
const cardTemplate = document.querySelector('#card-template').content;

function submitEditProfileForm (evt) {
    evt.preventDefault();
    nameProfile.textContent = namePopup.value;
    statusProfile.textContent = statusPopup.value;
    closePopup(popupEditContainer);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  cardElement.querySelector('.cards__image').setAttribute('src', link);
  cardElement.querySelector('.cards__image').setAttribute('alt', name);
  cardElement.querySelector('.cards__name').textContent = name;

  cardElement.querySelector('.cards__stroke').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__stroke_active');
  })

  const cardDeleteButton = cardElement.querySelector('.cards__delete');
  cardDeleteButton.addEventListener('click', function (evt) {
    const cardItem = cardDeleteButton.closest('.cards__item');
    cardItem.remove();
  })
    
  const cardOpenButton = cardElement.querySelector('.cards__open');
  cardOpenButton.addEventListener('click', function (evt) {
    const cardItem = cardOpenButton.closest('.cards__item');
    const cardText = cardItem.querySelector('.cards__name').textContent
    const cardImage = cardItem.querySelector('.cards__image').getAttribute('src')
    popupCaption.textContent = cardText; 
    popupImage.setAttribute('src', cardImage);
    popupImage.setAttribute('alt', cardText);
    openPopup(bigCard);
  })

  return cardElement;
}

function addPlace(name, link) {
  const cardElement = createCard(name, link);
  cardsList.prepend(cardElement);
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();
  addPlace(nameAddPopup.value, linkAddPopup.value)
  closePopup(popupAddContainer)
  nameAddPopup.value = '';
  linkAddPopup.value = '';
}

profileEditButton.addEventListener('click', function () {
  namePopup.value = nameProfile.textContent;
  statusPopup.value = statusProfile.textContent;
  openPopup(popupEditContainer);

})

popupEditCloseButton.addEventListener('click', function() {
    closePopup(popupEditContainer)
})

formElement.addEventListener('submit', submitEditProfileForm);

cardAddButton.addEventListener('click', function() {openPopup(popupAddContainer)})

popupAddCloseButton.addEventListener('click', function() {closePopup(popupAddContainer)})

formAddElement.addEventListener('submit', submitAddPlaceForm);

cardCloseButton.addEventListener('click', function() {closePopup(bigCard)})
  
initialCards.forEach(function(item) {
  addPlace(item.name, item.link);
})
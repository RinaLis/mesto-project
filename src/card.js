import { openPopup, closePopup } from "./modal.js";

function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
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
      const cardText = cardItem.querySelector('.cards__name').textContent;
      const bigCard = document.querySelector('.popup_view_card');
      const popupImage = bigCard.querySelector('.popup__image');
      const popupCaption = bigCard.querySelector('.popup__caption');
      popupCaption.textContent = cardText; 
      popupImage.setAttribute('src', cardItem.querySelector('.cards__image').getAttribute('src'));
      popupImage.setAttribute('alt', cardText);
      openPopup(bigCard);
      
      const cardCloseButton = bigCard.querySelector('.popup__close');
      cardCloseButton.addEventListener('click', function() {closePopup(bigCard)})
    })
  
    return cardElement;
  }
  
  export function addPlace(name, link) {
    const cardElement = createCard(name, link);
    const cardsList = document.querySelector('.cards__items');
    cardsList.prepend(cardElement);
  }
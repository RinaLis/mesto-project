import { openPopup, closePopup } from "./modal.js";

const cardTemplate = document.querySelector('#card-template').content;

const bigCard = document.querySelector('.popup_view_card');
const popupImage = bigCard.querySelector('.popup__image');
const popupCaption = bigCard.querySelector('.popup__caption');
const cardCloseButton = bigCard.querySelector('.popup__close');

cardCloseButton.addEventListener('click', function() {closePopup(bigCard)})

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image')
  const cardName = cardElement.querySelector('.cards__name')

  const cardText = name
  const cardLink = link
  
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', cardText);
  cardName.textContent = cardText;
  
  cardElement.querySelector('.cards__stroke').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__stroke_active');
  })
  
  const cardDeleteButton = cardElement.querySelector('.cards__delete');
  cardDeleteButton.addEventListener('click', function (evt) {
    cardElement.remove();
  })
      
  const cardOpenButton = cardElement.querySelector('.cards__open');
  cardOpenButton.addEventListener('click', function (evt) {
    popupCaption.textContent = cardText; 
    popupImage.setAttribute('src', cardLink);
    popupImage.setAttribute('alt', cardText);
    openPopup(bigCard);  
  })
  
  return cardElement;
}
  
bigCard.addEventListener('click', (evt) => {
  const withinBoundaries = evt.target.closest('.popup__main-container');
  evt.stopPropagation();
  if(withinBoundaries === bigCard.closest('.popup__main-container')) {
    closePopup(bigCard)
  }    
})

export function addPlace(name, link) {
  const cardElement = createCard(name, link);
  const cardsList = document.querySelector('.cards__items');
  cardsList.prepend(cardElement);
}
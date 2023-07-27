import { openPopup, closePopup } from "./modal.js";
import { personId } from "./index.js";
import { saveNewLike, deleteLike, deleteCard } from "./api.js";
import { buttonDelete, popupDeleteContainer } from "./constants.js";

const cardTemplate = document.querySelector('#card-template').content;

const bigCard = document.querySelector('.popup_view_card');
const popupImage = bigCard.querySelector('.popup__image');
const popupCaption = bigCard.querySelector('.popup__caption');
const cardCloseButton = bigCard.querySelector('.popup__close');

cardCloseButton.addEventListener('click', function() {closePopup(bigCard)})

const createCard = (config) => {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image')
  const cardName = cardElement.querySelector('.cards__name')
  const numLikes = cardElement.querySelector('.cards__stroke-number')

  const cardText = config.name
  const cardLink = config.link
  
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', cardText);
  cardName.textContent = cardText;
  numLikes.textContent = config.likes.length;

  personId.then((id) => {
    if (config.likes.some((item)=>{
      return (item._id === id)
    })) {
      cardElement.querySelector('.cards__stroke').classList.add('cards__stroke_active')
    }
  })
  
  cardElement.querySelector('.cards__stroke').addEventListener('click', function (evt) {
    if (evt.target.classList.contains('cards__stroke_active')) {
      deleteLike(config.id).then((number)=>{
        numLikes.textContent = number
        evt.target.classList.remove('cards__stroke_active')
      })
    } else {
      saveNewLike(config.id).then((number)=>{
        numLikes.textContent = number
        evt.target.classList.add('cards__stroke_active')
      })
    }  
  })

  personId.then((id) => {
    if (id === config.owner) {
      const cardDeleteButton = cardElement.querySelector('.cards__delete');
      cardDeleteButton.classList.add('cards__delete_active')
      cardDeleteButton.addEventListener('click', function (evt) {
        openPopup(popupDeleteContainer)
        buttonDelete.addEventListener('click', (evt) => {
          deleteCardFinally(cardElement, config.id)
        })
      })
    }
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

export const addPlace = (config) => {
  const cardElement = createCard(config);
  const cardsList = document.querySelector('.cards__items');
  cardsList.prepend(cardElement);
}

const deleteCardFinally = (cardElement, id) => {
  cardElement.remove();
  deleteCard(id);
  closePopup(popupDeleteContainer)
}
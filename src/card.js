import { openPopup, closePopup } from "./modal.js";
import { personId } from "./index.js";
import { saveNewLike, deleteLike, deleteCard } from "./api.js";
import { buttonDelete, popupDeleteContainer, cardsList, buttonCloseDelete } from "./constants.js";
import { catchError } from "./utils.js";

const cardTemplate = document.querySelector('#card-template').content;

const bigCard = document.querySelector('.popup_view_card');
const popupImage = bigCard.querySelector('.popup__image');
const popupCaption = bigCard.querySelector('.popup__caption');

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

  personId
    .then((id) => {
      if (config.likes.some((item) => {
        return (item._id === id)
      })) {
        cardElement.querySelector('.cards__stroke').classList.add('cards__stroke_active')
      }
    })
    .catch(catchError)

  cardElement.querySelector('.cards__stroke').addEventListener('click', function (evt) {
    if (evt.target.classList.contains('cards__stroke_active')) {
      deleteLike(config.id)
        .then((result) => {
          return result.likes.length
        })
        .then((number) => {
          numLikes.textContent = number
          evt.target.classList.remove('cards__stroke_active')
        })
        .catch(catchError)
    } else {
      saveNewLike(config.id)
        .then((result) => {
          return result.likes.length
        })
        .then((number) => {
          numLikes.textContent = number
          evt.target.classList.add('cards__stroke_active')
        })

        .catch(catchError)
    }
  })
  
  const addListener = (evt) => {
    deleteCardFinally(cardElement, config.id);
    buttonDelete.removeEventListener('click', addListener)
  }

  const removeListener = (evt) => {
    buttonDelete.removeEventListener('click', addListener)
    buttonCloseDelete.removeEventListener('click', removeListener)
  }

  personId.then((id) => {
    if (id === config.owner) {
      const cardDeleteButton = cardElement.querySelector('.cards__delete');
      cardDeleteButton.classList.add('cards__delete_active')
      cardDeleteButton.addEventListener('click', function (evt) {
        openPopup(popupDeleteContainer)
        buttonDelete.addEventListener('click', addListener)
        buttonCloseDelete.addEventListener('click', removeListener)
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
  if (withinBoundaries === bigCard.closest('.popup__main-container')) {
    closePopup(bigCard)
  }
})

export const addPlace = (config) => {
  const cardElement = createCard(config);
  cardsList.prepend(cardElement);
}

const deleteCardFinally = (cardElement, id) => {
  deleteCard(id)
    .then((result) => {
      cardElement.remove();
      return result
    })
    .then (() => closePopup(popupDeleteContainer))
    .catch(catchError);
  
}
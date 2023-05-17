
const initialCards = [
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

const popupEditContainer = document.querySelector('.popup_view_edit');
const closeButton = popupEditContainer.querySelector('.popup__close');
const formElement = popupEditContainer.querySelector('.popup__form')
const namePopup = formElement.querySelector('#name');
const statusPopup = formElement.querySelector('#status');
const saveButton = popupEditContainer.querySelector('.popup__button');

const popupAddContainer = document.querySelector('.popup_view_place');
const closeAddButton = popupAddContainer.querySelector('.popup__close');
const formAddElement = popupAddContainer.querySelector('.popup__form')
const nameAddPopup = formAddElement.querySelector('#place');
const linkAddPopup = formAddElement.querySelector('#link');
const saveAddButton = popupAddContainer.querySelector('.popup__button');

const profileContainer = document.querySelector('.profile');
const editButton = profileContainer.querySelector('.profile__edit');
const addButton = profileContainer.querySelector('.profile__add');
const nameProfile = profileContainer.querySelector('.profile__name');
const statusProfile = profileContainer.querySelector('.profile__status');

const cardsList = document.querySelector('.cards__items');
const cardLike = cardsList.querySelectorAll

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = namePopup.value;
    statusProfile.textContent = statusPopup.value;
    popupEditContainer.classList.remove('popup_opened');
}

function addPlace(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  
    cardElement.querySelector('.cards__image').setAttribute('src', link);
    cardElement.querySelector('.cards__name').textContent = name;
    
    cardsList.append(cardElement);

    cardElement.querySelector('.cards__stroke').addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__stroke_active');
    })

    const deleteButton = cardElement.querySelector('.cards__delete');

    deleteButton.addEventListener('click', function (evt) {
      const cardItem = deleteButton.closest('.cards__item');
      cardItem.remove();
    })
  }

function formSubmitHandlerPlace(evt) {
  evt.preventDefault();
  addPlace(nameAddPopup.value, linkAddPopup.value)
  popupAddContainer.classList.remove('popup_opened');
}


editButton.addEventListener('click', function () {
    popupEditContainer.classList.add('popup_opened');
    namePopup.setAttribute('placeholder', nameProfile.textContent);
    statusPopup.setAttribute('placeholder', statusProfile.textContent);

})

closeButton.addEventListener('click', function() {
    popupEditContainer.classList.remove('popup_opened');
})

formElement.addEventListener('submit', formSubmitHandler);



addButton.addEventListener('click', function () {
  popupAddContainer.classList.add('popup_opened');
})

closeAddButton.addEventListener('click', function() {
  popupAddContainer.classList.remove('popup_opened');
})

formAddElement.addEventListener('submit', formSubmitHandlerPlace);



  
initialCards.forEach(function(item) {
  addPlace(item.name, item.link);
})
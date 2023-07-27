import { setProfileInfo } from "./index.js";
import { addPlace } from "./card.js";
import { popupAddContainer, popupErrorContainer, textError } from "./constants.js";
import { closePopup, openPopup } from "./modal.js";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
    headers: {
        authorization: '9f433244-896f-46f3-bafe-2de72bf8d268',
        'Content-Type': 'application/json'
    }
  }
  
export const getInitialCards = () => {
    fetch(config.baseUrl+'/cards', {method: 'GET', headers: config.headers})
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Ошибка: ${res.status}`)
            }
        })
        .then((result) => {
            result.forEach(function(item) {
                addPlace({name: item.name, link: item.link, likes: item.likes, id: item._id, owner: item.owner._id});
            })
        })
        .catch((err) => {
            textError.textContent = err;
            openPopup(popupErrorContainer);
        })
} 

export const saveNewCard = (newCard) => {
    return fetch(config.baseUrl+'/cards', {
        method: 'POST', 
        headers: config.headers, 
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Ошибка: ${res.status}`)
            }
        })
        .then((result) => {
            addPlace({name: result.name, link: result.link, likes: result.likes, id: result._id, owner: result.owner._id})
        })
        .then(()=>{
            closePopup(popupAddContainer);
        })
        .catch((err) => {
            textError.textContent = err;
            openPopup(popupErrorContainer);
        })
}

export const getPersonInfo = () => {
    return fetch(config.baseUrl+'/users/me', {method: 'GET', headers: config.headers})
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Ошибка: ${res.status}`)
            }
        })
        .then((result) => {
            setProfileInfo(result.name, result.about, result.avatar)
            return (result._id)
        })
        .catch((err) => {
            textError.textContent = err;
            openPopup(popupErrorContainer);
        })
}

export const saveNewProfileInfo = (newProfile) => {
    return fetch(config.baseUrl+'/users/me', {
        method: 'PATCH', 
        headers: config.headers, 
        body: JSON.stringify({
            name: newProfile.name,
            about: newProfile.status
        })
    })
        .catch((err) => {
            textError.textContent = err;
            openPopup(popupErrorContainer);
        })
}

export const saveNewLike = (cardId) => {
    return fetch(config.baseUrl+'/cards/likes/'+cardId, {
        method: 'PUT', 
        headers: config.headers})
        .then ((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Ошибка: ${res.status}`)
            }
        })
        .then ((result) => {
            return result.likes.length
        })
        .catch((err) => {
            textError.textContent = err;
            openPopup(popupErrorContainer);
        })
}

export const deleteLike = (cardId) => {
    return fetch(config.baseUrl+'/cards/likes/'+cardId, {
        method: 'DELETE', 
        headers: config.headers})
        .then ((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Ошибка: ${res.status}`)
            }
        })
        .then ((result) => {
            return result.likes.length
        })
        .catch((err) => {
            textError.textContent = err;
            openPopup(popupErrorContainer);
        })
}

export const deleteCard = (cardId) => {
    return fetch(config.baseUrl+'/cards/'+cardId, {
        method: 'DELETE', 
        headers: config.headers})
        .then ((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Ошибка: ${res.status}`)
            }
        })
        .then ((result) => {
            return result
        })
        .catch((err) => {
            textError.textContent = err;
            openPopup(popupErrorContainer);
        })
}

export const setAvatar = (link) => {
    return fetch(config.baseUrl+'/users/me/avatar', {
        method: 'PATCH', 
        headers: config.headers, 
        body: JSON.stringify({
            avatar: link,
        })
    })
    .then ((res) => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
    .then ((result) => {
        
    })
    .catch((err) => {
        textError.textContent = err;
        openPopup(popupErrorContainer);
    })

}
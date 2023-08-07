import { request } from "./utils.js";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
    headers: {
        authorization: '9f433244-896f-46f3-bafe-2de72bf8d268',
        'Content-Type': 'application/json'
    }
}

export const getInitialCards = () => {
    return request(config.baseUrl + '/cards', { method: 'GET', headers: config.headers })
}

export const saveNewCard = (newCard) => {
    return request(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
        })
    })
}

export const getPersonInfo = () => {
    return request(config.baseUrl + '/users/me', { method: 'GET', headers: config.headers })
}

export const saveNewProfileInfo = (newProfile) => {
    return request(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newProfile.name,
            about: newProfile.status
        })
    })
}

export const saveNewLike = (cardId) => {
    return request(config.baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: config.headers
    })
}

export const deleteLike = (cardId) => {
    return request(config.baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    })
}

export const deleteCard = (cardId) => {
    return request(config.baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    })
}

export const setAvatar = (link) => {
    return request(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        })
    })
}
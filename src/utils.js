import { textError, popupErrorContainer } from "./constants.js"
import { openPopup, closePopup } from "./modal.js"

const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

export const catchError = (err) => {
    textError.textContent = err;
    openPopup(popupErrorContainer);
}

export const request = (url, options) => {
    return fetch(url, options).then(checkResponse)
}

function renderLoading(isLoading, button, initialText, loadingText) {
    if (isLoading) {
        button.textContent = loadingText
    } else {
        button.textContent = initialText
    }
}

export function handleSubmit(request, evt, loadingText = 'Сохранение...') {
    evt.preventDefault();
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText);
    const popup = document.querySelector('.popup_opened');
    request()
        .then(() => {
            evt.target.reset();
            closePopup(popup);
        })
        .catch(catchError)
        .finally(() => {
            renderLoading(false, submitButton, initialText, loadingText);
        });
}
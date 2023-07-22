const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
    
};
  
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};
  
export const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
  
export const checkElementsState = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input')); //выбирает инпуты 
  const buttonElement = formElement.querySelector('.popup__button') //и кнопку
  toggleButtonState(inputList, buttonElement); //проверяем состояние кнопки
  inputList.forEach((inputElement) => { 
    togglePlaceholderState(formElement, inputElement);
    inputElement.addEventListener('input', function () { //каждый раз при вводе проверяем состояние
      toggleButtonState(inputList, buttonElement); //кнопки
      checkInputValidity(formElement, inputElement); //ошибок
      togglePlaceholderState(formElement, inputElement); //плейсхолдера
    });
  });
};
  
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form')); //выбирает все формы
  formList.forEach((formElement) => { //для каждой формы отдельно
    formElement.addEventListener('submit', function (evt) { //слушатель для submit
      evt.preventDefault();
    });
    const fieldsetElement = formElement.querySelector('.popup__set');
    checkElementsState(fieldsetElement)
  });
};
  
const hasInvalidInput = (inputList) => {
  return inputList.some(function(itemInput) {
    return !itemInput.validity.valid;
  })
}
  
export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove('popup__button_active');
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.add('popup__button_active');
    buttonElement.removeAttribute('disabled')
  }
}

export const togglePlaceholderState = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`.${inputElement.id}-placeholder`); 
  if (inputElement.validity.valueMissing) {
    placeholderElement.classList.add('popup__placeholder_active')
  } else {
    placeholderElement.classList.remove('popup__placeholder_active')
  }
}
  
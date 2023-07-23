const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.errorInput);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorState);
    
};
  
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.errorInput);
  errorElement.classList.remove(config.errorState);
  errorElement.textContent = '';
};
  
export const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};
  
export const checkElementsState = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); 
  const buttonElement = formElement.querySelector(config.buttonSubmit)
  toggleButtonState(inputList, buttonElement, config); 
  inputList.forEach((inputElement) => {
    togglePlaceholderState(formElement, inputElement, config);
    inputElement.addEventListener('input', function () { 
      toggleButtonState(inputList, buttonElement, config); 
      checkInputValidity(formElement, inputElement, config); 
      togglePlaceholderState(formElement, inputElement, config); 
    });
  });
};
  
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) { 
      evt.preventDefault();
    });
    const fieldsetElement = formElement.querySelector(config.fieldsetSelector);
    checkElementsState(fieldsetElement, config)
  });
};
  
const hasInvalidInput = (inputList) => {
  return inputList.some(function(itemInput) {
    return !itemInput.validity.valid;
  })
}
  
export const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove(config.buttonState);
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.add(config.buttonState);
    buttonElement.removeAttribute('disabled')
  }
}

export const togglePlaceholderState = (formElement, inputElement, config) => {
  const placeholderElement = formElement.querySelector(`.${inputElement.id}-placeholder`); 
  if (inputElement.validity.valueMissing) {
    placeholderElement.classList.add(config.placeholderState)
  } else {
    placeholderElement.classList.remove(config.placeholderState)
  }
}
  
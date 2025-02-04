export const validation: Record<string, { regxp: RegExp, message: string }> = {
  name: {
    regxp: /^[A-ZА-ЯЁ]{1}[A-Za-zА-ЯЁа-яё-]+$/,
    message: 'Может состоять только из букв (также можно дефис), первая должна быть заглавной',
  },
  login: {
    regxp: /^[A-Za-z0-9_-]{3,20}$/,
    message: 'Имеет длину от 3 до 20 символов, состоит из латинских букв, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы "-" и "_")',
  },
  email: {
    regxp: /^[\w+-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: 'Состоит из латиницы, цифр, знаков "-" и "_"; содержит знак "@" и точку после него, перед и после точки должны быть буквы',
  },
  password: {
    regxp: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(\w|-|_){8,40}$/,
    message: 'Имеет длину от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  },
  phone: {
    regxp: /^\+?\d{10,15}$/,
    message: 'Начинается со знака "+", имеет длину от 10 до 15 цифр',
  },
  notempty: {
    regxp: /^.+$/,
    message: 'Поле не должно быть пустым',
  },
};

const validateData = (inputValue: string, rule: string) => {
  if (
    typeof validation[rule] === 'undefined'
    || validation[rule].regxp.test(inputValue)
  ) {
    return true;
  }

  return validation[rule].message;
};

export const showErrorById = (input: HTMLInputElement, message: string) => {
  const parent = input.parentElement?.parentElement as HTMLElement;
  parent.classList.add('error');
  if ((input as HTMLInputElement)?.value !== '') {
    parent.classList.add('is--active');
  } else {
    parent.classList.remove('is--active');
  }
  const childError = parent.querySelector('.input__error');
  if (childError !== null) {
    childError.innerHTML = message;
  } else {
    const errorElement = document.createElement('div');
    errorElement.classList.add('input__error');
    errorElement.innerHTML = message;
    parent.appendChild(errorElement);
  }
  setTimeout(() => parent.querySelector('.input__error')?.remove(), 3000);
};

const inputCommonTest = (input: HTMLInputElement) => {
  const ruleTest = validateData(input.value, (input.dataset.rule ?? ''));

  if (ruleTest === true) {
    return true;
  }

  showErrorById(input, ruleTest);

  return false;
};

export const focusOutById = (id: string) => {
  const input = document.getElementById(id);
  if (input) {
    return inputCommonTest(input as HTMLInputElement);
  }

  return false;
};

export const inputTest = (event: Event) => {
  inputCommonTest(event.target as HTMLInputElement);
};

const commonHideError = (parent: HTMLElement) => {
  parent.classList.remove('error');
  const childError = parent.querySelector('.input__error');
  if (childError !== null) {
    childError.remove();
  }
};

export const focusInById = (id: string) => {
  const parent = document.getElementById(id)?.closest('.input__box'); // input?.parentElement?.parentElement;
  if (parent) {
    (parent as HTMLElement).classList.add('is--active');
    commonHideError(parent as HTMLElement);
  }
};

export const inputHideError = (event: Event) => {
  const parent = (event.target as HTMLInputElement).parentElement?.parentElement as HTMLElement;
  if (parent) {
    parent.classList.add('is--active');
    commonHideError(parent);
  }
};

import { StringIndexed } from './global';

export const profileLabels: StringIndexed = {
  login: 'Логин',
  first_name: 'Имя',
  second_name: 'Фамилия',
  display_name: 'Отображаемое имя',
  email: 'E-mail',
  password: 'Пароль',
  phone: 'Телефон',
  oldpassword: 'Прежний пароль',
  newpassword: 'Новый пароль',
};

export const profileRules: StringIndexed = {
  login: 'login',
  first_name: 'name',
  second_name: 'notempty',
  display_name: 'notempty',
  email: 'email',
  password: 'password',
  phone: 'phone',
  oldpassword: 'password',
  newpassword: 'password',
};

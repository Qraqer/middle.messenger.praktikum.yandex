import Block from '../../modules/Block';
import RegisterTemplate from './Register.tpl';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import { validation, focusOutById, showErrorById } from '../../utils/validation';
import { router } from '../../modules/Router';
import { ISignUp, StringIndexed } from '../../types/global';
import { AuthController } from '../../controllers/AuthController';
import chatsController from '../../controllers/ChatsController';
import Pages from '..';

export class Register extends Block {
  constructor() {
    super({
      events: {
        submit: (event: Event) => this.submitAuth(event),
      },
    });
  }

  protected childrenInit() {
    this.children = {
      email: new Input({
        label: 'Почта',
        id: 'email',
        name: 'email',
        type: 'text',
        rule: 'email',
      }),
      login: new Input({
        label: 'Логин',
        id: 'login',
        name: 'login',
        type: 'text',
        rule: 'login',
      }),
      first_name: new Input({
        label: 'Имя',
        id: 'first_name',
        name: 'first_name',
        type: 'text',
        rule: 'name',
      }),
      second_name: new Input({
        label: 'Фамилия',
        id: 'second_name',
        name: 'second_name',
        type: 'text',
        rule: 'name',
      }),
      phone: new Input({
        label: 'Телефон',
        id: 'phone',
        name: 'phone',
        type: 'text',
        rule: 'phone',
      }),
      password: new Input({
        label: 'Пароль',
        id: 'password',
        name: 'password',
        type: 'password',
        rule: 'password',
      }),
      password_check: new Input({
        label: 'Пароль (еще раз)',
        id: 'password_check',
        name: 'password_check',
        type: 'password',
      }),
      button: new Button({
        inner: 'Зарегистрироваться',
        class: 'btn',
        id: 'submit-register',
        link: '/chatlist',
        type: 'submit',
      }),
      link: new Link({
        class: 'align_center',
        link: '/',
        inner: 'Войти',
      }),
    };
  }

  submitAuth(event: Event) {
    event.preventDefault();
    let formSuccess = true;
    const data: StringIndexed = {};
    Object.values(this.children).forEach((child) => {
      if (child.id === 'password_check') {
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const passwordCheckInput = document.getElementById(child.id) as HTMLInputElement;
        if (passwordInput?.value !== passwordCheckInput?.value) {
          showErrorById(passwordCheckInput, 'Пароли не совпадают');
        }
      } else {
        if (!child.props.rule || child.props.rule === '' || typeof validation[child.props.rule] === 'undefined') {
          return;
        }
        if (!focusOutById(child.id)) {
          formSuccess = false;
        } else {
          data[child.props.name] = (document.getElementById(child.props.id) as HTMLInputElement)?.value;
        }
      }
    });
    if (formSuccess) {
      console.log('submitAuth', data);
      AuthController.register(data as ISignUp)
        .then(() => {
          chatsController.getList();
          router.go(Pages.Chatspage.url);
        })
        .catch((error) => {
          if (error.reason === 'User already in system') {
            router.go(Pages.Chatspage.url);
          } else {
            alert('Ошибка авторизации!');
            console.log(error);
          }
        });
    }
  }

  componentDidMount(): void {
    AuthController.fetchUser()
      .then(() => router.go(Pages.Chatspage.url));
  }

  protected render() {
    return this.compile(RegisterTemplate, {});
  }
}

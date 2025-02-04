import Block from '../../modules/Block';
import AuthTemplate from './Auth.tpl';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import { validation, focusOutById } from '../../utils/validation';
import { router } from '../../modules/Router';
import { ISignIn, StringIndexed } from '../../types/global';
import { AuthController } from '../../controllers/AuthController';
import chatsController from '../../controllers/ChatsController';
import Pages from '..';

export class Auth extends Block {
  constructor() {
    super({
      events: {
        submit: (event: Event) => this.submitAuth(event),
      },
    });
  }

  protected childrenInit() {
    this.children = {
      login: new Input({
        label: 'Логин',
        id: 'login',
        name: 'login',
        type: 'text',
        rule: 'notempty',
      }),
      password: new Input({
        label: 'Пароль',
        id: 'password',
        name: 'password',
        type: 'password',
        rule: 'notempty',
      }),
      button: new Button({
        inner: 'Войти',
        class: 'btn',
        id: 'submit-login',
        link: '/chatlist',
        type: 'submit',
      }),
      link: new Link({
        class: 'align_center',
        link: '/sign-up',
        inner: 'Впервые?',
      }),
    };
  }

  submitAuth(event: Event) {
    event.preventDefault();
    let formSuccess = true;
    let data: StringIndexed = {};
    Object.values(this.children).forEach((child) => {
      if (!child.props.rule || child.props.rule === '' || typeof validation[child.props.rule] === 'undefined') {
        return;
      }
      if (!focusOutById(child.id)) {
        formSuccess = false;
      } else {
        data[child.props.name] = (document.getElementById(child.props.id) as HTMLInputElement)?.value;
      }
    });
    if (formSuccess) {
      AuthController.login(data as ISignIn)
        .then(() => {
          chatsController.getList();
          router.go(Pages.Chatspage.url);
        })
        .catch(error => {
          if (error.reason === 'User already in system') {
            router.go(Pages.Chatspage.url);
          } else {
            alert('Ошибка авторизации!');
            console.log(error);
          }
        })
    }
  }

  componentDidMount(): void {
    AuthController.fetchUser()
      .then(() => router.go(Pages.Chatspage.url));
  }

  protected render() {
    return this.compile(AuthTemplate, {});
  }
}

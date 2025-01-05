import Block from '../../modules/Block';
import AuthTemplate from './Auth.tpl';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import { validation, focusOutById } from '../../utils/validation';

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
        text: 'Войти',
        class: 'btn',
        id: 'submit-login',
        link: 'chatlist',
        type: 'submit',
      }),
      link: new Link({
        class: 'align_center',
        link: 'register',
        text: 'Впервые?',
      }),
    };
  }

  submitAuth(event: Event) {
    event.preventDefault();
    let formSuccess = true;
    Object.values(this.children).forEach((child) => {
      if (!child.props.rule || child.props.rule === '' || typeof validation[child.props.rule] === 'undefined') {
        return;
      }
      if (!focusOutById(child.id)) {
        formSuccess = false;
      }
    });
    if (formSuccess) {
      document.dispatchEvent(new CustomEvent('changePage', {
        detail: { link: 'chatlist' },
      }));
    }
  }

  protected render() {
    return this.compile(AuthTemplate, {});
  }
}

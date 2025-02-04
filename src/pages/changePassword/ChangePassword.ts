import Block from '../../modules/Block';
import tpl from './ChangePassword.tpl';
import { IPassword, Props } from '../../types/global';
import { focusOutById, showErrorById } from '../../utils/validation';
import { Link } from '../../components/Link/Link';
import { Button } from '../../components/Button/Button';
import Pages from '..';
import { Avatar } from '../../components/Avatar/Avatar';
import checkUser from '../../utils/checkUser';
import { profileRules } from '../../types/const';
import UserController from '../../controllers/UserController';
import { Input } from '../../components/Input/Input';

export class ChangePassword extends Block {
  constructor(props: Props) {
    super({
      ...props
    });
  }

  init() {
    super.init();
    checkUser();
  }

  protected childrenInit() {
    this.children = {
      backlink: new Link({
        class: 'btn__circle',
        link: Pages.Profile.url,
        inner: '',
      }),
      avatar: new Avatar({}),
      oldpsw: new Input({
        label: '',
        id: 'oldPassword',
        name: 'oldPassword',
        type: 'password',
        value: '',
        rule: profileRules.oldpassword
      }),
      newpsw: new Input({
        label: '',
        id: 'newPassword',
        name: 'newPassword',
        type: 'password',
        value: '',
        rule: profileRules.newpassword
      }),
      newpswrepeat: new Input({
        label: '',
        id: 'newPasswordRepeat',
        name: 'newPasswordRepeat',
        type: 'password',
        value: '',
        rule: profileRules.newpassword
      }),
      button: new Button({
        id: 'profile-submit',
        inner: 'Сохранить',
        link: Pages.Profile.url,
        class: 'btn',
        events: {
          click: (event) => this.submitProfile(event as Event)
        }
      })
    }
  }

  submitProfile(event: Event) {
    event.preventDefault();
    let submitSuccess = true;
    const formResult: Record<string, any> = {};
    const inputs = document.getElementById('form-profile')?.querySelectorAll('input');
    inputs?.forEach((input, i) => {
      const name = input.getAttribute('name') ?? 'name_' + i;
      if (name === 'newPasswordRepeat' && input.value !== (document.getElementById('newPassword') as HTMLInputElement).value) {
        showErrorById(input, 'Введенные пароли (новый и повторный) не совпадают');
        submitSuccess = false;
        return;
      }
      if (!focusOutById(input.getAttribute('id') as string)) {
        submitSuccess = false;
        return;
      }
      if (name !== 'newPasswordRepeat') {
        formResult[ name ] = input.value;
      }
    })

    if (submitSuccess) {
      UserController.updatePassword(formResult as IPassword);
      const button = document.getElementById('profile-submit');
      if (button?.innerHTML) {
        button.innerHTML = 'Сохранено';
        button.setAttribute('disabled', 'disabled');
        setTimeout(() => {
          button.innerHTML = 'Сохранить';
          button.removeAttribute('disabled');
          inputs?.forEach(input => input.value = '');
        }, 2000);
      }
    }
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

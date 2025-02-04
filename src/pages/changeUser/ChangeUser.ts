import Block from '../../modules/Block';
import tpl from './ChangeUser.tpl';
import { Props, TUser } from '../../types/global';
import { validation, focusOutById } from '../../utils/validation';
import { Link } from '../../components/Link/Link';
import { Button } from '../../components/Button/Button';
import Pages from '..';
import { Avatar } from '../../components/Avatar/Avatar';
import { withStore } from '../../hoc/withStore';
import { EditRow } from '../../components/EditRow/EditRow';
import checkUser from '../../utils/checkUser';
import { profileLabels, profileRules } from '../../types/const';
import UserController from '../../controllers/UserController';

class ChangeUserBase extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  init() {
    super.init();
    checkUser();
  }

  protected childrenInit() {
    this.children = {};
    this.children.backlink = new Link({
      class: 'btn__circle',
      link: Pages.Profile.url,
      inner: '',
    });
    this.children.avatar = new Avatar({});
    this.children.editrows = Object.keys(profileLabels)
      .filter((key) => (['password', 'oldpassword', 'newpassword']).indexOf(key) === -1)
      .map((key: any) => new EditRow({
        labeltext: profileLabels[key],
        label: '',
        id: (key as string),
        name: (key as string),
        type: 'text',
        value: this.props[key] ?? '',
        rule: profileRules[key] ?? '',
      }));
    this.children.button = new Button({
      id: 'profile-submit',
      inner: 'Сохранить',
      link: Pages.Profile.url,
      class: 'btn',
      events: {
        click: (event) => this.submitProfile(event as Event),
      },
    });

    /* this.children = {
      backlink: new Link({
        class: 'btn__circle',
        link: Pages.Profile.url,
        inner: '',
      }),
      avatar: new Avatar({}),
      editrows: Object.keys(profileLabels)
        .filter(key => (['password', 'oldpassword', 'newpassword']).indexOf(key) === -1)
        .map((key: any) => new EditRow({
          labeltext: profileLabels[key],
          label: '',
          id: (key as string),
          name: (key as string),
          type: 'text',
          value: this.props[key] ?? '',
          rule: profileRules[key] ?? ''
        })),
      button: new Button({
        id: 'profile-submit',
        inner: 'Сохранить',
        link: Pages.Profile.url,
        class: 'btn',
        events: {
          click: (event) => this.submitProfile(event as Event)
        }
      })
    } */
  }

  submitProfile(event: Event) {
    event.preventDefault();
    let submitSuccess = true;
    const formResult: Record<string, any> = {};
    const inputs = document.getElementById('form-profile')?.querySelectorAll('input');
    inputs?.forEach((input, i) => {
      const name = input.getAttribute('name') ?? `name_${i}`;
      if (!input.dataset?.rule || input.dataset?.rule === '' || typeof validation[input.dataset?.rule] === 'undefined') {
        formResult[name] = input.value;

        return;
      }
      if (!focusOutById(input.getAttribute('id') as string)) {
        submitSuccess = false;

        return;
      }
      formResult[name] = input.value;
    });
    if (submitSuccess) {
      UserController.updateProfile(formResult as TUser);
      const button = document.getElementById('profile-submit');
      if (button?.innerHTML) {
        button.innerHTML = 'Сохранено';
        button.setAttribute('disabled', 'disabled');
        setTimeout(() => {
          button.innerHTML = 'Сохранить';
          button.removeAttribute('disabled');
        }, 2000);
      }
    }
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withProfileEdit = withStore((state) => ({
  login: state.user?.login,
  first_name: state.user?.first_name,
  second_name: state.user?.second_name,
  phone: state.user?.phone,
  email: state.user?.email,
  display_name: state.user?.display_name,
  avatar: state.user?.avatar,
}));

export const ChangeUser = withProfileEdit(ChangeUserBase);

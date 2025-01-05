import Block from '../../modules/Block';
import tpl from './Profile.tpl';
// import * as Dummy from '../../dummy';
import { Props, IProfileEdit } from '../../types/global';
import { validation, focusOutById, showErrorById } from '../../utils/validation';
import { ProfileRow } from '../../components/ProfileRow/ProfileRow';
import { ProfileRowEdit } from '../../components/ProfileRowEdit/ProfileRowEdit';
import { Link } from '../../components/Link/Link';
import { Button } from '../../components/Button/Button';

interface IEditPassword {
  label: string,
  name: string,
  id: string,
  type: string,
  rule?: string
}

export class Profile extends Block {
  constructor(props: Props) {
    const events = props.page === 'profile' ? {} : {
      submit: (event: Event) => this.submitProfile(event),
    };
    super({
      ...props,
      events,
    });
  }

  protected childrenInit() {
    this.children.backlink = new Link({
      class: 'btn__circle',
      link: 'chatlist',
      text: '',
    });
    switch (this.props.page) {
      case 'profile':
        this.children.profilerow = this.props.data
          .filter((child: Record<string, any>) => child.type === 'text')
          .map((child: Record<string, any>) => new ProfileRow({
            label: child.label,
            value: child.value,
          }));
        this.children.links = [
          { link: 'profile-edit', class: 'profile__link', text: 'Изменить данные' },
          { link: 'profile-pasword', class: 'profile__link', text: 'Изменить пароль' },
          { link: 'chatlist', class: 'profile__link c-red', text: 'Выйти' },
        ].map((link) => new Link(link));
        break;
      case 'profile-edit':
        this.children.profilerowedit = this.props.data
          .filter((child: Record<string, any>) => child.type === 'text')
          .map((child: Record<string, any>) => {
            const props: IProfileEdit = {
              label: child.label,
              value: child.value,
              type: child.type,
              name: child.name,
              id: child.name,
            };
            if (typeof child.rule !== 'undefined') {
              props.rule = child.rule;
            }

            return new ProfileRowEdit(props);
          });
        this.children.button = new Button({
          id: 'profile-submit',
          text: 'Сохранить',
          link: 'profile',
          class: 'btn',
        });
        break;
      case 'profile-pasword':
        this.children.profilerowedit = [
          { id: 'password_old', label: 'Старый пароль' },
          { id: 'password', label: 'Новый пароль', rule: 'password' },
          { id: 'password_check', label: 'Повторите новый пароль' },
        ].map((field: Record<string, any>) => {
          const props: IEditPassword = {
            type: 'password',
            label: field.label,
            id: field.id,
            name: field.id,
          };
          if (typeof field.rule !== 'undefined') {
            props.rule = field.rule;
          }

          return new ProfileRowEdit(props);
        });
        this.children.button = new Button({
          id: 'profile-submit',
          text: 'Сохранить',
          link: 'profile',
          class: 'btn',
        });
        break;
      // no default
    }
  }

  submitProfile(event: Event) {
    event.preventDefault();
    let submitSuccess = true;
    Object.values(this.children.profilerowedit).forEach((child) => {
      if (child.props.id === 'password_check') {
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const passwordCheckInput = document.getElementById(child.props.id) as HTMLInputElement;
        if (passwordInput?.value !== passwordCheckInput?.value) {
          showErrorById(passwordCheckInput, 'Пароли не совпадают');
          submitSuccess = false;
        }
      } else {
        if (!child.props.rule || child.props.rule === '' || typeof validation[child.props.rule] === 'undefined') {
          return;
        }
        if (!focusOutById(child.props.id)) {
          console.log(child.props.name, child.props.rule, focusOutById(child.props.id));
          submitSuccess = false;
        }
      }
    });
    if (submitSuccess) {
      document.dispatchEvent(new CustomEvent('changePage', {
        detail: { link: 'profile' },
      }));
    }
  }

  render() {
    return this.compile(tpl, {
      profileState: this.props.page,
      data: this.props.data,
    });
  }
}

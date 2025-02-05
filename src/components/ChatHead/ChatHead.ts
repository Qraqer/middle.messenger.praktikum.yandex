import { AuthController } from '../../controllers/AuthController';
import chatsController from '../../controllers/ChatsController';
import Block from '../../modules/Block';
import { router } from '../../modules/Router';
import Pages from '../../pages';
import { focusOutById } from '../../utils/validation';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Link } from '../Link/Link';
import { Modal } from '../Modal/Modal';
import { Search } from '../Search/Search';
import tpl from './ChatHead.tpl';

export class ChatHead extends Block {
  protected childrenInit(): void {
    this.children = {
      logout: new Button({
        id: 'logout',
        class: 'link__simple',
        link: Pages.Auth.url,
        inner: '<span class="ico-arrow-right"> </span><span>Выйти</span>',
        events: {
          click: () => AuthController.logout().then(() => router.go(Pages.Auth.url)),
        },
      }),
      add: new Button({
        id: 'add',
        class: 'link__simple',
        inner: '<span>Создать чат</span>',
        events: {
          click: (event) => this.showModal(event as Event),
        },
      }),
      link: new Link({
        class: 'link__simple',
        link: Pages.Profile.url,
        inner: '<span>Профиль</span> <span class="ico-arrow-right"></span>',
      }),
      search: new Search(),
      modal: new Modal({
        id: 'add_chat',
        title: 'Новый чат',
        content: new Input({
          label: 'Название чата',
          id: 'new_chat',
          name: 'title',
          type: 'text',
          placeholder: '',
          rule: 'notempty',
        }),
        cancel: new Button({
          id: 'cancel',
          class: 'btn btn__cancel',
          inner: 'Отменить',
          events: {
            click: (event) => this.closeModal(event as Event),
          },
        }),
        submit: new Button({
          id: 'submit',
          class: 'btn btn__submit',
          inner: 'Создать',
          events: {
            click: (event) => this.createChat(event as Event),
          },
        }),
      }),
    };
  }

  createChat(event: Event) {
    event.preventDefault();
    if (focusOutById('new_chat')) {
      const title = (document.getElementById('new_chat') as HTMLInputElement)?.value;
      chatsController.createChat(title)
        .then(() => chatsController.getList())
        .catch((error) => console.log('Ошибка создания чата: ', error.reason));
      this.closeModal(event);
    }
  }

  showModal(event: Event) {
    event.preventDefault();
    (document.getElementById('new_chat') as HTMLInputElement).value = '';
    (this.children.modal as Modal).show();
  }

  closeModal(event: Event) {
    event.preventDefault();
    (this.children.modal as Modal).hide();
  }

  render() {
    return this.compile(tpl, {});
  }
}

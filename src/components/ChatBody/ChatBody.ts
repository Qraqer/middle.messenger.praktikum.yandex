import chatsController from '../../controllers/ChatsController';
import chatUsersController from '../../controllers/ChatUsersController';
import MessageController from '../../controllers/MessageController';
import UserController from '../../controllers/UserController';
import { withStore } from '../../hoc/withStore';
import Block from '../../modules/Block';
import store from '../../modules/Store';
import {
  IChatInfo, Props, StringIndexed,
} from '../../types/global';
import { focusOutById, validation } from '../../utils/validation';
import { ChatAvatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import ChatMessage from '../ChatMessage/ChatMessage';
import { ChatUsersDelete } from '../ChatUsersDelete/ChatUsersDelete';
import Found from '../Found/Found';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import { TextBlock } from '../TextBlock/TextBlock';
import tpl from './ChatBody.tpl';

export class ChatBodyBase extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).closest('.js-show-menu')) {
            (event.target as HTMLElement).closest('.js-menu-parent')?.classList.toggle('active');
          }
        },
      },
    });
  }

  protected childrenInit() {
    this.children = {
      addUser: new Button({
        inner: 'Добавить пользователя',
        class: 'chat-body__menu-link add',
        id: 'add_user',
        link: '',
        type: 'button',
        events: {
          click: (event) => {
            event?.preventDefault();
            this.showModal('addUserModal');
          },
        },
      }),
      deleteUser: new Button({
        inner: 'Удалить пользователя',
        class: 'chat-body__menu-link delete',
        id: 'delete_user',
        link: '',
        type: 'button',
        events: {
          click: async (event) => {
            event?.preventDefault();
            if (this.props.currentChat) {
              await chatUsersController.getChatUsers(this.props.currentChat);
              this.showModal('delUserModal');
            }
          },
        },
      }),
      deleteChat: new Button({
        inner: 'Удалить чат',
        class: 'chat-body__menu-link delete',
        id: 'delete_chat',
        link: '',
        type: 'button',
        events: {
          click: async (event) => {
            event?.preventDefault();
            if (this.props.currentChat) {
              this.showModal('delChatModal');
            }
          },
        },
      }),
      avatar: new ChatAvatar({}),
      chatMessages: new ChatMessage({}),
      sendMessage: new Button({
        inner: '<span class="ico-arrow"></span>',
        class: 'newmessage__send-btn',
        id: 'submit-newmessage',
        link: '',
        type: 'submit',
        events: {
          click: (event) => {
            event?.preventDefault();
            this.sendMessage(event as Event);
          },
        },
      }),
      addUserModal: new Modal({
        id: 'addUserModal',
        title: 'Добавить пользователя',
        content: [
          new Input({
            label: 'Логин пользователя',
            id: 'add-user',
            name: 'add-user',
            type: 'text',
            placeholder: '',
            rule: 'notempty',
            events: {
              input: async (event: Event) => {
                const login = (event.target as HTMLInputElement).value;
                if (login !== '') {
                  await UserController.searchUser(login);
                } else {
                  this.emptyFound();
                }
                document.getElementById('add-user')?.focus();
              },
            },
          }),
          new Found({
            events: {
              click: (event: Event) => this.choosedUser(event),
            },
          }),
        ],
        cancel: new Button({
          id: 'cancel',
          class: 'btn btn__cancel',
          inner: 'Отменить',
          events: {
            click: (event) => {
              event?.preventDefault();
              this.closeModal('addUserModal');
            },
          },
        }),
        submit: new Button({
          id: 'submit',
          class: 'btn btn__submit',
          inner: 'Добавить',
          events: {
            click: async (event) => {
              event?.preventDefault();
              const input = (document.getElementById('add-user') as HTMLInputElement);
              const userId = input?.dataset?.id;
              if (userId) {
                input.value = '';
                await chatUsersController.addUsers(this.props.currentChat, [parseInt(userId, 10)])
                  .then(() => chatUsersController.getChatUsers(this.props.currentChat))
                  .catch((e) => console.error('Ошибка добавления пользователя: ', e.reason));
              }
              this.closeModal('addUserModal');
            },
          },
        }),
      }),
      delUserModal: new Modal({
        id: 'delUserModal',
        title: 'Удалить пользователя',
        content: new ChatUsersDelete({}),
        cancel: new Button({
          id: 'cancel',
          class: 'btn btn__cancel',
          inner: 'Отменить',
          events: {
            click: (event) => {
              event?.preventDefault();
              this.closeModal('delUserModal');
            },
          },
        }),
        submit: new Button({
          id: 'submit',
          class: 'btn btn__submit',
          inner: 'Удалить',
          events: {
            click: async (event) => {
              event?.preventDefault();
              const inputValues: number[] = [];
              document.getElementById('delUserModal')?.querySelectorAll('input[type="checkbox"]')?.forEach((input) => {
                if ((input as HTMLInputElement).checked) {
                  inputValues.push(parseInt((input as HTMLInputElement).value, 10));
                }
              });
              if (inputValues.length) {
                await chatUsersController.deleteUsers(this.props.currentChat, inputValues)
                  .then(() => chatUsersController.getChatUsers(this.props.currentChat))
                  .catch((e) => console.error('Ошибка удаления пользователя(ей): ', e.reason));
              }
              this.closeModal('delUserModal');
            },
          },
        }),
      }),
      delChatModal: new Modal({
        id: 'delChatModal',
        title: 'Удалить чат',
        content: new TextBlock({ inner: 'Вы действительно хотите удалить данный чат?' }),
        cancel: new Button({
          id: 'cancel',
          class: 'btn btn__cancel',
          inner: 'Отменить',
          events: {
            click: (event) => {
              event?.preventDefault();
              this.closeModal('delChatModal');
            },
          },
        }),
        submit: new Button({
          id: 'submit',
          class: 'btn btn__submit',
          inner: 'Удалить',
          events: {
            click: async (event) => {
              event?.preventDefault();
              chatsController.deleteChat(this.props.currentChat)
                .then(() => {
                  store.set('currentChat', null);
                  chatsController.getList();
                })
                .catch((e) => console.log('Ошибка удаления чата: ', e.reason));
              this.closeModal('delChatModal');
            },
          },
        }),
      }),
    };
  }

  private emptyFound() {
    store.set('foundUsers', []);
    document.querySelectorAll('.found-users').forEach((item) => { item.innerHTML = ''; });
  }

  private choosedUser(event: Event) {
    const id = (event?.target as HTMLElement)?.dataset?.id;
    const input = (event?.target as HTMLElement)?.closest('.modal__content')?.querySelector('input');
    if (id && input) {
      input.dataset.id = id;
      if ((event?.target as HTMLElement)?.dataset?.login) {
        input.value = (event.target as HTMLElement).dataset.login ?? '';
      }
      this.emptyFound();
    }
  }

  sendMessage(event: Event) {
    event.preventDefault();
    let formSuccess = true;
    const data: StringIndexed = {};
    document.getElementById('newmessage')?.querySelectorAll('input')?.forEach((input) => {
      if (!input.dataset.rule || input.dataset.rule === '' || typeof validation[input.dataset.rule] === 'undefined') {
        data[input.name] = input.value;

        return;
      }
      if (!focusOutById(input.id)) {
        formSuccess = false;
      } else {
        data[input.name] = input.value;
      }
    });
    if (formSuccess) {
      MessageController.postMessage(this.props.currentChat, data.message);
    }
  }

  showModal(id: string) {
    document.querySelector('.js-menu-parent.active')?.classList.remove('active');
    (this.children[id] as Modal).show();
  }

  closeModal(id: string) {
    this.emptyFound();
    (this.children[id] as Modal).hide();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withChatBody = withStore((state) => ({
  messages: { ...(state.messages || {}) },
  currentChat: state.currentChat || undefined,
  chat: state.chats.find((chat: IChatInfo) => chat.id === state.currentChat),
  userId: state.user?.id,
  foundUsers: state.foundUsers ?? [],
}));

export const ChatBody = withChatBody(ChatBodyBase);

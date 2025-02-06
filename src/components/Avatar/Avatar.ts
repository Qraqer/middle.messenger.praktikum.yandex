import { AuthController } from '../../controllers/AuthController';
import chatsController from '../../controllers/ChatsController';
import UserController from '../../controllers/UserController';
import { withStore } from '../../hoc/withStore';
import Block from '../../modules/Block';
import { IChatInfo, IStore, Props } from '../../types/global';
import { Button } from '../Button/Button';
import { FileInput } from '../FileInput/FileInput';
import { Modal } from '../Modal/Modal';
import tpl from './Avatar.tpl';

class AvatarBase extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected childrenInit() {
    this.children = {
      avatarButton: new Button({
        id: 'showModal',
        inner: '',
        class: 'avatar-button',
        events: {
          click: () => this.showModal('avatarModal'),
        },
      }),
      avatarModal: new Modal({
        id: 'avatarModal',
        title: 'Загрузить аватарку',
        content: new FileInput({
          id: 'avatar',
          name: 'avatar',
        }),
        cancel: new Button({
          id: 'cancel',
          class: 'btn btn__cancel',
          type: 'button',
          inner: 'Отменить',
          events: {
            click: (event) => {
              event?.preventDefault();
              this.closeModal('avatarModal');
            },
          },
        }),
        submit: new Button({
          id: 'submit',
          class: 'btn btn__submit',
          type: 'submit',
          inner: 'Добавить',
          events: {
            click: (event) => {
              event?.preventDefault();
              this.sendAvatar();
            },
          },
        }),
        events: {
          submit: (event: unknown) => {
            (event as Event)?.preventDefault();
            this.sendAvatar();
          },
        },
      }),
    };
  }

  private async sendAvatar() {
    const data = new FormData();
    const fileInput = document.getElementById('avatar') as HTMLInputElement;
    if (fileInput?.files?.length) {
      data.append('avatar', fileInput.files[0]);
      if (!this.props.currentChat) {
        await UserController.updateAvatar(data)
          .then(() => {
            AuthController.fetchUser();
            fileInput.value = '';
          })
          .catch((e) => console.log('Ошибка добавления аватара к пользователю: ', e.reason));
      } else {
        data.append('chatId', this.props.currentChat);
        await chatsController.updateAvatar(data)
          .then(() => {
            chatsController.getList();
            fileInput.value = '';
          })
          .catch((e) => console.log('Ошибка добавления аватара к чату: ', e, e.reason));
      }
    }
    this.closeModal('avatarModal');
  }

  showModal(id: string) {
    (this.children[id] as Modal).show();
  }

  closeModal(id: string) {
    (this.children[id] as Modal).hide();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const mapStateToProps = (state: IStore) => ({
  avatar: state.user?.avatar ?? '',
});

export const Avatar = withStore(mapStateToProps)(AvatarBase);

export const UserAvatar = withStore((state: IStore) => ({
  avatar: state.user?.avatar ?? '',
}))(AvatarBase);

export const ChatAvatar = withStore((state: IStore) => ({
  avatar: state.chats?.find((chat: IChatInfo) => chat.id === state.currentChat)?.avatar ?? '',
  currentChat: state.currentChat,
}))(AvatarBase);

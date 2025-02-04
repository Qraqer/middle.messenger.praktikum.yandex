import UserController from "../../controllers/UserController";
import { withStore } from "../../hoc/withStore";
import Block from "../../modules/Block";
import { Button } from "../Button/Button";
import { FileInput } from "../FileInput/FileInput";
import { Modal } from "../Modal/Modal";
import tpl from './Avatar.tpl';

class AvatarBase extends Block {
  constructor(props: any) {
    super({
      ...props
    })
  }

  protected childrenInit() {
    this.children = {
      avatarButton: new Button({
        id: 'showModal',
        inner: '',
        class: 'avatar-button',
        events: {
          click: () => this.showModal('avatarModal')
        }
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
          inner: 'Добавить',
          events: {
            click: async (event) => {
              event?.preventDefault();
              const data = new FormData();
              const fileInput = document.getElementById('avatar') as HTMLInputElement;
              if (fileInput?.files?.length){
                data.append('avatar', fileInput.files[0]);
                await UserController.updateAvatar(data);
              }
              this.closeModal('avatarModal');
            },
          },
        })
      })
    };
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

const mapStateToProps = (state: any) => {
  return {
    avatar: state.user?.avatar ?? ''
  };
}

export const Avatar = withStore(mapStateToProps)(AvatarBase);
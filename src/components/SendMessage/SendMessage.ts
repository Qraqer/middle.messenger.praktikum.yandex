import Block from '../../modules/Block';
import tpl from './SendMessage.tpl';
import { focusOutById } from '../../utils/validation';

export class SendMessage extends Block {
  constructor() {
    super({
      events: {
        submit: (event: Event) => this.submitMessage(event)
      }
    });
  }

  submitMessage(event: Event) {
    event.preventDefault();
    const message = document.querySelector('[name="message"]') as HTMLInputElement;
    message.dataset.rule = 'notempty';
    if (!focusOutById('message')) {
      setTimeout(() => {
        const parent = document.querySelector('.newmessage.error');
        if (parent) {
          parent.classList.remove('.error');
          parent.querySelector('.input__error')?.remove();
        }
      }, 1000);
      return;
    }
    alert(`Сообщение с текстом ${message.value} отправлено!`);
    message.value = '';
  }

  render() {
    return this.compile(tpl, {});
  }
}
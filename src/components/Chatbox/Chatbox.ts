import Block from '../../modules/Block';
import { Props } from '../../types/global';
import tpl from './Chatbox.tpl';
import * as Dummy from '../../dummy';
import { Chatmessages } from '../Chatmessages/Chatmessages';
import { SendMessage } from '../SendMessage/SendMessage';

export class Chatbox extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected childrenInit() {
    if (typeof this.props.chat !== 'undefined') {
      this.children.chatmessages = Dummy.chatData.messages.map(
        (message: Record<string, any>) => new Chatmessages(message),
      );
      this.children.sendmessage = new SendMessage();
    }
  }

  render() {
    const props = this.props.empty
      ? { empty: true }
      : { title: Dummy.chatData.title };

    return this.compile(tpl, props);
  }
}

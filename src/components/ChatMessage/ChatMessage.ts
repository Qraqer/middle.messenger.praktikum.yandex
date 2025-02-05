import { withStore } from '../../hoc/withStore';
import Block from '../../modules/Block';
import { IMessage, IMessageProps, IStore } from '../../types/global';
import tpl from './ChatMessage.tpl';

class ChatMessages extends Block {
  constructor(props: IMessageProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(tpl, { message: this.props.messages });
  }
}

const mapStateToProps = (state: IStore) => {
  const messages = state.currentChat ? (state.messages || {})[state.currentChat] : [];

  return {
    messages: messages?.map((message: IMessage) => ({
      isAuthor: message.user_id === state.user?.id,
      datetime: (new Date(message.time)).toLocaleString(),
      content: message.content,
    })),
  };
};

export default withStore(mapStateToProps)(ChatMessages);

import { withStore } from "../../hoc/withStore";
import Block from "../../modules/Block";
import { IMessageProps } from "../../types/global";
import tpl from './ChatMessage.tpl';

class ChatMessages extends Block {
  constructor(props: IMessageProps) {
    super({
      ...props
    });
  }

  render() {
    return this.compile(tpl, {message: this.props.messages});
  }
}

const mapStateToProps = (state: any) => {
  const messages = state.currentChat ? (state.messages || {})[state.currentChat] : [];

  return {
    messages: messages?.map((message: any) => ({
      isAuthor: message.user_id === state.user?.id,
      datetime: (new Date(message.time)).toLocaleString(),
      content: message.content
    })),
  };
}

export default withStore(mapStateToProps)(ChatMessages);
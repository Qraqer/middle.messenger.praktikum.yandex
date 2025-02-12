import { withStore } from '../../hoc/withStore';
import Block from '../../modules/Block';
import { Props } from '../../types/global';
import tpl from './ChatUsersDelete.tpl';

export class ChatUsersDeleteBase extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(tpl, {
      chatuser: this.props.chatUsers,
    });
  }
}

const withChatUsersDelete = withStore((state) => ({
  chatUsers: state.chatUsers ?? [],
}));

export const ChatUsersDelete = withChatUsersDelete(ChatUsersDeleteBase);

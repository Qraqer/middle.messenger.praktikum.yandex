import chatsController from "../../controllers/ChatsController";
import { withStore } from "../../hoc/withStore";
import Block from "../../modules/Block";
import Store from "../../modules/Store";
import { IChatCard, StringIndexed } from '../../types/global';
import isEqual from "../../utils/isEqual";
import { ChatCard } from "../ChatCard/ChatCard";
import tpl from './ChatList.tpl';

interface IChatList extends StringIndexed {
  chats: IChatCard[];
}

export class ChatListBase extends Block<IChatList> {
  constructor(props: IChatList) {
    super({ ...props });
  }

  protected childrenInit(): void {
    const state = Store.getState();
    this.children.chats = this.getChats(state);
  }

  protected componentDidUpdate(oldProps: IChatList, newProps: IChatList) {
    if (!isEqual(oldProps, newProps)) {
      this.children.chats = this.getChats(newProps);

      return true;
    }
    return false;
  }

  private getChats(props: IChatList) {
    const chats = props.chats.map(data => new ChatCard({
      ...data,
      events: {
        click: () => chatsController.setChat(data.id)
      }
    }));
    return chats;
  }

  render() {
    return this.compile(tpl, {});
  }
}

const withChats = withStore(state => ({ chats: [ ...(state.chats || [])] }));

export const ChatList = withChats(ChatListBase);

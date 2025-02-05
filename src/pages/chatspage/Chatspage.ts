import chatsController from '../../controllers/ChatsController';
import { ChatBody } from '../../components/ChatBody/ChatBody';
import { ChatHead } from '../../components/ChatHead/ChatHead';
import { ChatList } from '../../components/ChatList/ChatList';
import Block from '../../modules/Block';
import tpl from './Chatspage.tpl';
import store from '../../modules/Store';
import checkUser from '../../utils/checkUser';

export class Chatspage extends Block {
  constructor() {
    super({});
  }

  init() {
    super.init();
    checkUser();
    try {
      chatsController.getList();
    } catch (error) {
      console.log('Ошибка : ', error);
    }
  }

  protected childrenInit(): void {
    const state = store.getState();
    this.children = {
      head: new ChatHead(),
      list: new ChatList(state),
      body: new ChatBody(state),
    };
  }

  protected render() {
    return this.compile(tpl, {});
  }
}

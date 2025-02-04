import chatsController from "../../controllers/ChatsController";
import { ChatBody } from "../../components/ChatBody/ChatBody";
import { ChatHead } from "../../components/ChatHead/ChatHead";
import { ChatList } from "../../components/ChatList/ChatList";
import Block from "../../modules/Block";
import tpl from './Chatspage.tpl';
// import { TextBlock } from "../../components/TextBlock/TextBlock";
import Store from "../../modules/Store";
// import { AuthController } from "../../controllers/AuthController";
import checkUser from "../../utils/checkUser";

export class Chatspage extends Block {
  constructor() {
    super({});
  }

  init() {
    super.init();
    checkUser();
    chatsController.getList();
  }

  protected childrenInit(): void {
    const store = Store.getState();
    this.children = {
      head: new ChatHead(),
      list: new ChatList(store),
      body: new ChatBody(store)
    }
  }

  protected render() {
    return this.compile(tpl, {});
  }
}
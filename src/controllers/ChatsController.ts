import { ChatsApi } from '../api/ChatsApi';
import store from '../modules/Store';
import { ID } from '../types/global';
import MessageController from './MessageController';

class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  async createChat(title: string) {
    const chatId = await this.api.create(title);
    store.set('currentChat', chatId);
  }

  async deleteChat(chatId: ID) {
    await this.api.delete(chatId);
  }

  async getList() {
    const chats = await this.api.read();
    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);
      if (token) {
        await MessageController.connect(chat.id as number, token);
      }
    });
    chats.map((chat) => {
      if (chat?.last_message?.time) {
        chat.last_message.time = (new Date()).getDay() !== (new Date(chat.last_message.time)).getDay()
          ? (new Date(chat.last_message.time)).toLocaleDateString()
          : (new Date(chat.last_message.time)).toLocaleTimeString();
      }
    });
    store.set('chats', chats);
  }

  setChat(chatId: ID) {
    store.set('currentChat', chatId);
  }

  async getToken(chatId: ID) {
    const { token } = await this.api.readChatToken(chatId);

    return token;
  }
}

const chatsController = new ChatsController();

export default chatsController;

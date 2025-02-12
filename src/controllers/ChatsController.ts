import { ChatsApi } from '../api/ChatsApi';
import store from '../modules/Store';
import { IChatInfo, ID } from '../types/global';
import MessageController from './MessageController';

class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  async createChat(title: string) {
    try {
      await this.api.create(title);
    } catch (error) {
      console.error('Error in ChatsController.createChat: ', error);
    }
  }

  async deleteChat(chatId: ID) {
    try {
      await this.api.delete(chatId);
    } catch (error) {
      console.error('Error in ChatsController.deleteChat: ', error);
    }
  }

  async getList() {
    try {
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
    } catch (error) {
      console.error('Error in ChatsController.getList: ', error);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const chatData = await this.api.updateAvatar(data);
      store.set('chats', store.getState().chats.map((chat) => {
        if (chat.id === (chatData as IChatInfo).id) return chatData;

        return chat;
      }));
    } catch (error) {
      console.error('Error in ChatsController.updateAvatar: ', error);
    }
  }

  setChat(chatId: ID) {
    store.set('currentChat', chatId);
  }

  async getToken(chatId: ID) {
    try {
      const { token } = await this.api.readChatToken(chatId);

      return token;
    } catch (error) {
      console.error('Error in ChatsController.getToken: ', error);

      return false;
    }
  }
}

const chatsController = new ChatsController();

export default chatsController;

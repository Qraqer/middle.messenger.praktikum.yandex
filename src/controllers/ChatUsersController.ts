import { ChatUsersApi } from '../api/ChatUsersApi';
import store from '../modules/Store';

class ChatUsersController {
  private readonly api: ChatUsersApi;

  constructor() {
    this.api = new ChatUsersApi();
  }

  async getChatUsers(chatId: string) {
    try {
      return await this.api.getUsers(chatId);
    } catch (error) {
      console.error('Error in ChatUsersController.: ', error);

      return false;
    }
  }

  async addUsers(chatId: number, userId: number[]) {
    try {
      return await this.api.addUsers(chatId, userId);
    } catch (error) {
      console.error('Error in ChatUsersController.: ', error);

      return false;
    }
  }

  async deleteUsers(chatId: number, userId: number[]) {
    try {
      return await this.api.deleteUsers(chatId, userId);
    } catch (error) {
      console.error('Error in ChatUsersController.: ', error);

      return false;
    }
  }
}

const chatUsersController = new ChatUsersController();

export default chatUsersController;

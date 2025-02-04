import { ChatUsersApi } from '../api/ChatUsersApi';

class ChatUsersController {
  private readonly api: ChatUsersApi;

  constructor() {
    this.api = new ChatUsersApi();
  }

  async getChatUsers(chatId: string) {
    try {
      return this.api.getUsers(chatId);
    } catch (error) {
      console.error('Error in ChatUsersController.: ', error);
      return false;
    }
  }

  async addUsers(chatId: number, userId: number[]) {
    try {
      return this.api.addUsers(chatId, userId);
    } catch (error) {
      console.error('Error in ChatUsersController.: ', error);
      return false;
    }
  }

  async deleteUsers(chatId: number, userId: number[]) {
    try {
      return this.api.deleteUsers(chatId, userId);
    } catch (error) {
      console.error('Error in ChatUsersController.: ', error);
      return false;
    }
  }
}

const chatUsersController = new ChatUsersController();

export default chatUsersController;

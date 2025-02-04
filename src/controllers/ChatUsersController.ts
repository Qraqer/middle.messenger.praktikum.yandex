import { ChatUsersApi } from "../api/ChatUsersApi";

class ChatUsersController {
  private readonly api: ChatUsersApi;

  constructor() {
    this.api = new ChatUsersApi();
  }

  async getChatUsers(chatId: string) {
    return this.api.getUsers(chatId);
  }

  async addUsers(chatId: number, userId: number[]) {
    return this.api.addUsers(chatId, userId);
  }

  async deleteUsers(chatId: number, userId: number[]) {
    return this.api.deleteUsers(chatId, userId);
  }
}

const chatUsersController = new ChatUsersController();

export default chatUsersController;
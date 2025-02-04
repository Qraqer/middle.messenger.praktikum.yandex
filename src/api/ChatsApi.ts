import { IChatInfo, ID } from '../types/global';
import BaseApi from './BaseApi';

export class ChatsApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  read(): Promise<IChatInfo[]> {
    return this.http.get();
  }

  create(title: string) {
    return this.http.post('', { title });
  }

  delete(chatId: ID): Promise<unknown> {
    return this.http.delete('', { chatId });
  }

  readChatToken(chatId: ID): Promise<{ token: string }> {
    return this.http.post(`/token/${chatId}`);
  }

  update = undefined;
}

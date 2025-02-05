import { IUser } from '../types/global';
import BaseApi from './BaseApi';

type ID = string | number;

export class ChatUsersApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  getUsers(chatId: ID): Promise<IUser> {
    return this.http.get(`/${chatId}/users`);
  }

  addUsers(chatId: ID, users: ID[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId });
  }

  deleteUsers(chatId: ID, users: ID[]): Promise<unknown> {
    return this.http.delete('/users', { users, chatId });
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

import { UserApi } from '../api/UserApi';
import store from '../modules/Store';
import { IPassword, TUser } from '../types/global';

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async updateProfile(data: TUser) {
    try {
      await this.api.updateProfile(data);
    } catch (error) {
      console.error('Error in UserController.: ', error);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const userData = await this.api.updateAvatar(data);
      store.set('currentUser', userData);
    } catch (error) {
      console.error('Error in UserController.: ', error);
    }
  }

  async updatePassword(data: IPassword) {
    try {
      await this.api.updatePassword(data);
    } catch (error) {
      console.error('Error in UserController.: ', error);
    }
  }

  async searchUser(login: string) {
    try {
      const users = await this.api.searchUser(login);
      store.set('foundUsers', users);

      return users;
    } catch (error) {
      console.error('Error in UserController.: ', error);

      return false;
    }
  }
}

export default new UserController();

import { UserApi } from "../api/UserApi";
import store from "../modules/Store";
import Store from "../modules/Store";
import { IPassword, TUser } from "../types/global";

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async updateProfile(data: TUser) {
    await this.api.updateProfile(data);
  }

  async updateAvatar(data: FormData) {
    const userData = await this.api.updateAvatar(data);
    console.log('userData', userData);
    Store.set('currentUser', userData);
  }

  async updatePassword(data: IPassword) {
    await this.api.updatePassword(data);
  }

  async searchUser(login: string) {
    const users = await this.api.searchUser(login);
    store.set('foundUsers', users);
    return users;
  }
}

export default new UserController();
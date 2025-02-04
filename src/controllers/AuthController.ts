import AuthApi from '../api/AuthApi';
import store from '../modules/Store';
import { ISignIn, ISignUp } from '../types/global';
import { router } from '../modules/Router';
import Pages from '../pages';

export class AuthController {
  static async login(data: ISignIn) {
    await AuthApi.login(data);
    await this.fetchUser();
    router.go(Pages.Chatspage.url);
  }

  static async register(data: ISignUp) {
    await AuthApi.register(data);
    await this.fetchUser();
    router.go(Pages.Chatspage.url);
  }

  static async logout() {
    await AuthApi.logout();
    store.set('user', undefined);
    router.go(Pages.Auth.url);
  }

  static async fetchUser() {
    const user = await AuthApi.read();
    store.set('user', user);
  }
}

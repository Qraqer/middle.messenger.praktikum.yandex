import AuthApi from '../api/AuthApi';
import store from '../modules/Store';
import { ISignIn, ISignUp } from '../types/global';
import { router } from '../modules/Router';
import Pages from '../pages';

export class AuthController {
  static async login(data: ISignIn) {
    try {
      await AuthApi.login(data);
      await this.fetchUser();
      router.go(Pages.Chatspage.url);
    } catch (error) {
      console.error('Error in AuthController.login: ', error);
    }
  }

  static async register(data: ISignUp) {
    try {
      await AuthApi.register(data);
      await this.fetchUser();
      router.go(Pages.Chatspage.url);
    } catch (error) {
      console.error('Error in AuthController.register: ', error);
    }
  }

  static async logout() {
    try {
      await AuthApi.logout();
      store.set('user', undefined);
      router.go(Pages.Auth.url);
    } catch (error) {
      console.error('Error in AuthController.logout: ', error);
    }
  }

  static async fetchUser() {
    try {
      const user = await AuthApi.read();
      store.set('user', user);
    } catch (error) {
      console.error('Error in AuthController.fetchUser: ', error);
    }
  }
}

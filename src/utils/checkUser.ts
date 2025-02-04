import { AuthController } from '../controllers/AuthController';
import { router } from '../modules/Router';
import store from '../modules/Store';
import Pages from '../pages';

function checkUser() {
  if (!store.getState().user) {
    AuthController.fetchUser()
      .catch((e) => {
        console.log('Error: ', e.reason);
        router.go(Pages.Auth.url);
      });
  }
}

export default checkUser;

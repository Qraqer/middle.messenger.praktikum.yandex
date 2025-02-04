import { AuthController } from '../controllers/AuthController';
import store from '../modules/Store';

function checkUser() {
  if (!store.getState().user) {
    AuthController.fetchUser()
      .then(() => {
        const { user } = store.getState();
        console.log('checkUser', user);
      });
  }
}

export default checkUser;

import { ISignIn, ISignUp, IUser } from '../types/global';
import BaseApi from './BaseApi';

class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  register(data: ISignUp) {
    return this.http.post('/signup', data);
  }

  login(data: ISignIn) {
    return this.http.post('/signin', data);
  }

  read() : Promise<IUser> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthApi();

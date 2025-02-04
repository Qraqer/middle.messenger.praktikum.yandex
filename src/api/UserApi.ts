import { IPassword, IUser, TUser } from '../types/global';
import BaseApi from './BaseApi';

export class UserApi extends BaseApi {
  constructor() {
    super('/user');
  }

  updateProfile(data: TUser): Promise<IUser> {
    return this.http.put('/profile', data);
  }

  updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  updatePassword(data: IPassword) {
    return this.http.put('/password', data);
  }

  searchUser(login: string): Promise<IUser> {
    return this.http.post('/search', { login });
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

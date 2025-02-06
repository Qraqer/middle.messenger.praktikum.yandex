import { StringIndexed } from '../types/global';
import { Auth } from './auth/Auth';
import { ChangeUser } from './changeUser/ChangeUser';
import { ChangePassword } from './changePassword/ChangePassword';
import { Chatspage } from './chatspage/Chatspage';
import { Profile } from './profile/Profile';
import { Register } from './register/Register';

const Pages: StringIndexed = {
  Auth: {
    url: '/',
    page: Auth,
  },
  Register: {
    url: '/sign-up',
    page: Register,
  },
  Profile: {
    url: '/settings',
    page: Profile,
  },
  ProfileEdit: {
    url: '/settings-edit',
    page: ChangeUser,
  },
  ProfilePassword: {
    url: '/settings-password',
    page: ChangePassword,
  },
  Chatspage: {
    url: '/messenger',
    page: Chatspage,
  },
};

export default Pages;

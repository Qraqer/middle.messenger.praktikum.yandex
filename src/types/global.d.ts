export type Props<P extends Record<string, unknown> = any> = { events?: Record<string, (e?: Event) => void> } & P;

export type ID = string | number;

export type StringIndexed = Record<string, any>;

export type PlainObject<T = any> = {
  [k in string]: T;
};

export type Indexed<T = any> = {
  [k in (string | symbol)]: T;
};

export interface IProfileEdit {
  label: string,
  value: string,
  type: string,
  name: string,
  id: string,
  rule?: string
}

export interface ISignIn {
  login: string;
  password: string;
}

export interface ISignUp {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUser {
  id: ID;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export type TUser = Omit<IUser, 'id|password|avatar'>
export type TChatUser = Omit<IUser, 'password|email|phone'>

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}

export interface IModal {
  id: string;
  title: string;
  content: Block;
  cancel: Block;
  submit: Block;
}

export interface IChatInfo {
  id: ID;
  title?: string;
  avatar?: string;
  unread_count?: number;
  last_message?: {
    user: IUser,
    time: string;
    content: string;
  }
}

export interface IChatCard extends IChatInfo {
  selected?: boolean
}

/* export interface IChatCard {
  id: number,
  title: string,
  text: string,
  date: string,
  notRead: number,
  selected?: boolean
} */

export interface IMessage {
  chat_id: ID;
  time: string;
  type: string;
  user_id: ID;
  content: string;
  file?: {
    id: ID;
    user_id: ID;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

export interface IMessageProps {
  content: string;
  isAuthor: boolean;
  datetime: string | Date;
}


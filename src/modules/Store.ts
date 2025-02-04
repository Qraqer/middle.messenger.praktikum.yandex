import EventBus from "./EventBus";
import set from "../utils/set";
import { IChatInfo, IMessage, IUser, TChatUser } from "../types/global";

export enum StoreEvents {
  UPDATED = 'updated'
}

export interface IStore {
  user?: IUser,
  chats: IChatInfo[],
  currentChat: number | undefined,
  messages: Record<number, IMessage[]>,
  users: TChatUser[],
  foundUsers?: IUser[]
}

export class Store extends EventBus {
  private state: IStore = {
    chats: [],
    currentChat: undefined,
    messages: {},
    users: [],
    foundUsers: []
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.UPDATED, this.getState());
  };
}

const store = new Store();

export default store;
import EventBus from './EventBus';
import set from '../utils/set';
import { IStore } from '../types/global';

export enum StoreEvents {
  UPDATED = 'updated',
}

export class Store extends EventBus {
  private state: IStore = {
    chats: [],
    currentChat: undefined,
    messages: {},
    users: [],
    foundUsers: [],
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.UPDATED, this.getState());
  }
}

const store = new Store();

export default store;

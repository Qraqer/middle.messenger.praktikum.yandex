import store from '../modules/Store';
import WSTransport, { WSTEvents } from '../modules/WSTransport';
import { IMessage } from '../types/global';

class MessageController {
  private sockets: Map<Number, WSTransport> = new Map();
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = store.getState().user?.id;

    const wst = new WSTransport(`${this.baseURL}${userId}/${chatId}/${token}`);

    this.sockets.set(chatId, wst);

    await wst.connect();
    this.subscribe(wst, chatId);
    this.fetchMessages(chatId);
  }

  private subscribe(wst: WSTransport, chatId: number) {
    // @ts-expect-error: ts expects the type of message
    wst.on(WSTEvents.MESSAGE, (message: any) => this.onMessage(chatId, message));
    wst.on(WSTEvents.CLOSE, () => this.onClose(chatId));
  }

  public fetchMessages(chatId: number) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`Chat ${chatId} not connected`);
    }

    socket.send({ type: 'get old', content: null });
  }

  private onClose(chatId: number) {
    this.sockets.delete(chatId);
  }

  private onMessage(chatId: number, messages: IMessage | IMessage[]) {
    let messages2add: IMessage[] = [];

    if (Array.isArray(messages)) {
      messages2add = messages.flat().reverse();
    } else {
      messages2add.push(messages);
    }

    const thisMessages = (store.getState().messages || {})[chatId] || [];

    messages2add = [...thisMessages, ...messages2add];

    store.set(`messages.${chatId}`, messages2add);
  }

  public closeAllChats() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  public postMessage(chatId: number, message: string) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`Chat ${chatId} not connected`);
    }

    socket.send({ type: 'message', content: message });
  }
}

export default new MessageController('wss://ya-praktikum.tech/ws/chats/');

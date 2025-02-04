import EventBus from "./EventBus";

export const WSTEvents = {
  CONNECTED: 'connected',
  ERROR: 'Error',
  MESSAGE: 'message',
  CLOSE: 'close',
} as const;

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null;
  private pingInterval = 0;

  constructor(private url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTEvents.CONNECTED, () => resolve());
    })
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = window.setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000);

    this.on(WSTEvents.CLOSE, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    })
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => this.emit(WSTEvents.CONNECTED));

    socket.addEventListener('close', () => this.emit(WSTEvents.CLOSE));

    socket.addEventListener('error', (event: Event) => this.emit(WSTEvents.ERROR, event));

    socket.addEventListener('message', (message) => {
      if (message.data === 'WS token is not valid') {
        console.log(message);
        throw new Error('Unable to get messages, have error');
      }
      const data = JSON.parse(message.data);

      if (data?.type === 'pong' || data?.type === 'user connected') {
        return;
      }
      
      this.emit(WSTEvents.MESSAGE, data);
    });
  }
}
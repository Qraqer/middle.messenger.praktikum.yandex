import HTTPTransport from "../modules/HTTPTransport";

export default abstract class BaseApi {
  protected http: HTTPTransport;

  protected constructor(url: string) {
    this.http = new HTTPTransport(url);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(id: string | number): Promise<unknown>;

  public abstract update?(id: string | number, data: unknown): Promise<unknown>;

  public abstract delete?(id: string | number): Promise<unknown>;
}
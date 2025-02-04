import { StringIndexed } from '../types/global';
import queryStringify from '../utils/queryStringify';

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type TD = Document | XMLHttpRequestBodyInit | StringIndexed;

type HTTPMethod = <R=unknown>(url: string, options?: TD) => Promise<R>;

interface IOptions {
  method: METHODS;
  data?: TD,
  headers?: StringIndexed
}

export default class HTTPTransport {
  private API = 'https://ya-praktikum.tech/api/v2';
  private TIMEOUT = 5000;
  private url: string;

  constructor(url: string) {
    this.url = `${this.API}${url}`;
  }

  public get: HTTPMethod = (url = '', data = {}) => {
    return this.request(this.url + url, { method: METHODS.GET, data });
  }

  public put: HTTPMethod = (url, data = {}) => {
    return this.request(this.url + url, { method: METHODS.PUT, data });
  }

  public post: HTTPMethod = (url, data = {}) => {
    return this.request(this.url + url, { method: METHODS.POST, data });
  }

  public delete: HTTPMethod = (url, data = {}) => {
    return this.request(this.url + url, { method: METHODS.DELETE, data });
  }

  private request<Response>(url: string, options: IOptions): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');

        return;
      }

      if (method === METHODS.GET && data) {
        url += queryStringify(data as StringIndexed);
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.timeout = this.TIMEOUT;
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  }
}

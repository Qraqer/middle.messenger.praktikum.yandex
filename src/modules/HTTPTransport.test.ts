import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import HTTPTransport, { METHODS } from './HTTPTransport';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('/');
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('expects get() will send GET request', () => {
    instance.get('/user');
    const [request] = requests;
    expect(request.method).to.eq(METHODS.GET);
  });

  it('expects post() will send POST request', () => {
    instance.post('/signin');
    const [request] = requests;
    expect(request.method).to.eq(METHODS.POST);
  });

  it('expects put() will send PUT request', () => {
    instance.put('/chats/avatar');
    const [request] = requests;
    expect(request.method).to.eq(METHODS.PUT);
  });

  it('expects delete() will send DELETE request', () => {
    instance.delete('/chats/avatar');
    const [request] = requests;
    expect(request.method).to.eq(METHODS.DELETE);
  });
});

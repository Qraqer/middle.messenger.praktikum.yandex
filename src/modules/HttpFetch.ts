const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

function queryStringify(data: Record<string, any>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  let result = [];
  for (let [key, value] of Object.entries(data)) {
    value = Array.isArray(value) ? value.join(',') : value;
    result.push(`${key}=${value}`);
  }
  return result.length ? '?' + result.join('&') : '';
}

export class HttpFetch {
  get = (url: string, options = {}) => {
    return this.request(url, {...options, method: METHODS.GET});
  };
  put = (url: string, options = {}) => {
    return this.request(url, {...options, method: METHODS.PUT});
  };
  post = (url: string, options = {}) => {
    return this.request(url, {...options, method: METHODS.POST});
  };
  delete = (url: string, options = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE});
  };

  request = (url: string, options: Record<string, any>, timeout: number = 5000) => {
    const {method, data, headers = {}} = options;
    
    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }
      if (method === METHODS.GET && data) {
        url = url + queryStringify(data);
      }
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      
      for (let [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value as string);
      }
      
      xhr.timeout = timeout;
      
      xhr.onload = function() {
        resolve(xhr);
      }
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    })
  };

}
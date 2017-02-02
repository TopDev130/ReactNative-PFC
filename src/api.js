import {api} from './config';

export default function makeApi(getToken, msg) {

  // Private function extracting response
  function status(response) {
    const parseBody = response.json();

    return parseBody
      .catch(() => Promise.reject({
        global: 'There was an network error, try again'
      }))
      .then(body => {
        return new Promise((resolve, reject) => {
          if (response.status >= 200 && response.status < 300) {
            return resolve(body, response);
          }
          return reject({
            ...body.errors,
            statusCode: response.status
          }, response);
        });
      });
  }

  const lib = {

    /**
     * Proxy to window.fetch
     *
     * @description
     * Automatically adds common headers
     * and normilise response
     *
     * @param {string} url to fetch
     * @param {Object} opts - options
     * @returns {Function} status
     */
    fetch(url, opts = {}) {
      url = `${api}/${url}`;
      opts.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      const token = getToken();
      if (token) {
        opts.headers.Authorization = `Bearer ${token}`;
      }
      return window
        .fetch(url, opts)
        .catch(() => Promise.reject({
          global: msg.offline
        }))
        .then(status);
    },

    /**
     * Geneartes URL with access token in query string
     *
     * @description
     * Mainly used as a resource with EventSource
     *
     * @param {string} url provided
     * @returns {string} url with access token
     */
    generateUrl(url) {
      return `${api}/${url}?token=${getToken()}`;
    },

    encodeUri(object, parentKey) {
      let uri = '';

      for (let key in object) {
        if (object.hasOwnProperty(key)) {
          if (typeof object[key] === 'object') {
            uri += lib.encodeUri(object[key], key);
          } else {
            uri += parentKey
              ? `${parentKey}[${key}]=${object[key]}&`
              : `${key}=${object[key]}&`;
          }
        }
      }

      return uri;
    }

  };

  return lib;

}

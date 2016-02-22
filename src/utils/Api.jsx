import Fetch from 'whatwg-fetch';
const rootUrl = 'https://api.imgur.com/3/';
const apiKey = '430d6820d865788';

const Api = {
  get(url) {
    return fetch(rootUrl + url, {
      headers: {
        Authorization: `Client-ID ${apiKey}`
      }
    })
    .then(response => response.json());
  }
};

export default Api;

import { options } from "./constant";

class Api {
  constructor(config) {
    this.url = config.url;
    this._cardUrl = config.cardUrl;
    this._authorUrl = config.authorUrl;
    this._locationUrl = config.locationUrl;
    this.headers = config.headers;
  }
  _searchParams(data) {
    const searchParams = new URLSearchParams(data);
    return searchParams;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }
  getCardTasks(parameters) {
    return fetch(
      `${this.url}/${this._cardUrl}?${this._searchParams(
        parameters
      ).toString()}`,
      {
        headers: this.headers,
      }
    ).then(this._checkResponse);
  }
  getAuthorTasks() {
    return fetch(`${this.url}/${this._authorUrl}`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }
  getLocationsTasks() {
    return fetch(`${this.url}/${this._locationUrl}`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }
  getImagesTasks(urlImage) {
    return fetch(`${this.url}${urlImage}`).then(this._checkResponse);
  }
}
const api = new Api(options);
export default api;

import Handlebars from 'handlebars';

export default class App {
  constructor() {
    this.state = {
      currentPage: 'login',
      auth: null
    }
    this.appElement = document.getElementById('app');
  }
}
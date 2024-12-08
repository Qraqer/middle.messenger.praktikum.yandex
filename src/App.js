import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Dummy from './dummy.js';

import components from './components/index.js';

components.forEach(component => Handlebars.registerPartial(
  component[0],
  component[1]
));
Handlebars.registerHelper('useVar', function(myVar, options) {
  return options.fn(Object.assign({}, this, { myVar }));
});
Handlebars.registerHelper('checkIfEqual', function(value1, value2) {
  return value1 === value2;
});
Handlebars.registerHelper('checkIfNotEqual', function(value1, value2) {
  return value1 != value2;
});

export default class App {
  appElement = null;

  constructor() {
    this.state = {
      currentPage: 'login',
      currentChat: null,
      auth: null,
      profileState: 'view'
    }
    this.appElement = document.getElementById('app');
  }

  setEventHandlers() {
    document.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        event.preventDefault();
        event.stopPropagation();
        const parent = event.target.closest('a');
        if ('link' in parent.dataset) {
          this.state.currentPage = parent.dataset.link;
          this.render();
        }
      }
    })
    document.addEventListener('submit', (event) => {
      event.preventDefault();
      const btn = event.target.querySelector('button');
      if ('link' in btn.dataset) {
        this.state.currentPage = btn.dataset.link;
        this.render();
      }
    })
  }

  render() {
    let template;

    switch (this.state.currentPage) {
      case 'login':
      case 'register':
        template = Handlebars.compile(Pages.Auth);
        this.appElement.innerHTML = template({
          data: Dummy[this.state.currentPage]
        });
        document.querySelectorAll('input.input__text').forEach(element => {
          element.addEventListener('focus', this.setInputFocusHandler);
          element.addEventListener('blur', this.setInputBlurHandler);
        });
        break;
      case 'chatlist':
        const chat = this.currentChat ? Dummy.chatData : null;
        template = Handlebars.compile(Pages.Chatlist);
        this.appElement.innerHTML = template({
          data: Dummy.chatlistData,
          chat: chat,
        });
        if (this.currentChat) {
          document.querySelector(`[data-id="${this.currentChat}"]`).classList.add('is--active');
          document.querySelectorAll('.js-show-menu').forEach(element => {
            element.addEventListener('click', (event) => {
              event.target.closest('.js-menu-parent').classList.add('is--active');
            });
          })
          document.querySelectorAll('.js-menu-parent').forEach(element => {
            element.addEventListener('mouseleave', (event) => {
              event.target.classList.remove('is--active');
            })
          })
        }
        document.querySelectorAll('.js-open-chat').forEach(element => {
          element.addEventListener('click', (event) => {
            const item = event.target.closest('.js-open-chat');
            this.currentChat = parseInt(item.dataset.id);
            this.render();
          })
        })
        const search = document.querySelector('.input__text');
        if (search) {
          search.addEventListener('focus', this.setInputFocusHandler);
          search.addEventListener('blur', this.setInputBlurHandler);
        }
        break;
      case 'profile':
      case 'profile-edit':
      case 'profile-pasword':
        template = Handlebars.compile(Pages.Profile);
        this.appElement.innerHTML = template({
          data: Dummy.profileData,
          profileState: this.state.currentPage,
        });
        break;
    }
  }

  setInputFocusHandler(event) {
      const parent = event.target.closest('.js-input');
      if (parent) parent.classList.add('is--active');
  }

  setInputBlurHandler(event) {
    if (event.target.value === '') {
      const parent = event.target.closest('.js-input');
      if (parent) parent.classList.remove('is--active');
    }
  }
}
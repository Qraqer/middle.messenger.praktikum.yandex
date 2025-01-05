import Handlebars from 'handlebars';
import * as Dummy from './dummy';
import { Auth } from './pages/auth/Auth';
import { Register } from './pages/register/Register';
import { Chatlist } from './pages/chatlist/Chatlist';
import { Profile } from './pages/profile/Profile';

// import components from './components/index';

// components.forEach(component => Handlebars.registerPartial(
//   component[0],
//   component[1]
// ));
Handlebars.registerHelper('checkIfEqual', function(value1, value2) {
  return value1 === value2;
});
Handlebars.registerHelper('checkIfNotEqual', function(value1, value2) {
  return value1 != value2;
});

export default class App {
  private appElement: HTMLElement | null = null;
  private state: Record<string, any>;

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
    document.addEventListener('click', (event: Event) => {
      if ((event.target as HTMLTextAreaElement)?.closest('a')) {
        event.preventDefault();
        event.stopPropagation();
        const parent = (event.target as HTMLTextAreaElement).closest('a');
        if (parent !== null && 'link' in parent.dataset) {
          this.state.currentPage = parent.dataset.link;
          this.render();
        }
      }
      if ((event.target as HTMLTextAreaElement)?.closest('.js-show-menu')) {
        const menuParent = (event.target as HTMLTextAreaElement).closest('.js-menu-parent');
        if (menuParent) {
          menuParent.classList.add('is--active');
          menuParent.addEventListener('mouseleave', this.menuMouseLeave);
        }
      }
    })
    document.addEventListener('changePage', ((event: CustomEvent) => {
      this.state.currentPage = event.detail.link;
      this.render();
    }) as EventListener);
    document.addEventListener('changeChat', ((event: CustomEvent) => {
      this.state.currentPage = event.detail.link;
      this.state.currentChat = event.detail.chat;
      this.render();
    }) as EventListener);
  }

  menuMouseLeave(event: Event) {
    const parent = (event.target as HTMLTextAreaElement);
    if (parent) {
      parent.classList.remove('is--active');
      parent.removeEventListener('mouseleave', this.menuMouseLeave);
    }
  }

  render() {
    const currentPage: string = this.state.currentPage;
    let innerNode;

    switch (currentPage) {
      case 'login':
        innerNode = new Auth();
        break;
      case 'register':
        innerNode = new Register();
        break;
      case 'chatlist':
        innerNode = new Chatlist({
          empty: true
        });
        break;
      case 'chat':
        innerNode = new Chatlist({
          chat: this.state.currentChat
        });
        break;
      case 'profile':
      case 'profile-edit':
      case 'profile-pasword':
        innerNode = new Profile({
          page: this.state.currentPage,
          data: Dummy.profileData
        });
        break;
    }
    if (this.appElement !== null && innerNode) {
      this.appElement.innerHTML = '';
      this.appElement.appendChild(
        innerNode.getContent() as Node
      );
    }
  }
}

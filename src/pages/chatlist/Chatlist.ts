import Block from '../../modules/Block';
import tpl from './Chatlist.tpl';
import * as Dummy from '../../dummy';
import { Props } from '../../types/global';
import { Link } from '../../components/Link/Link';
import { Search } from '../../components/Search/Search';
import { Chats as ChatCard } from '../../components/Chats/Chats';
import { Chatbox } from '../../components/Chatbox/Chatbox';
import { IChatCard } from '../../types/global';

export class Chatlist extends Block {
  constructor(props: Props) {
    super({
      ...props
    });
  }

  protected childrenInit() {
    this.children.link = new Link({
      class: 'link__simple',
      link: 'profile',
      text: '<span>Профиль</span> <span class="ico-arrow-right"></span>'
    });
    this.children.search = new Search();
    this.children.chats = Dummy.chatlistData.map(data => {
      const props: IChatCard = data;
      props.selected = (typeof this.props.chat !== 'undefined' && this.props.chat === data.id);
      return new ChatCard({
        props,
        events: {
          click: () => this.changeChat(props.id)
        }
      })
    });
    const props = this.props.empty ? { empty: true } : { chat: this.props.chat};
    this.children.chatbox = new Chatbox(props);
  }

  render() {
    return this.compile(tpl, {});
  }

  changeChat(id: number) {
    document.dispatchEvent(new CustomEvent('changeChat', {
      detail: { link: 'chat', chat: id }
    }))
  }
}
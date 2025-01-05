import Block from '../../modules/Block';
import { Props } from '../../types/global';
import tpl from './Chats.tpl';
// import { IChatCard } from '../../types/global';

export class Chats extends Block {
  constructor(props: Props) {
    super({
      ...props
    });
  }

  render() {
    // const props: IChatCard = 
    // {
    //   id: this.props.props.id,
    //   title: this.props.props.title,
    //   text: this.props.props.text,
    //   date: this.props.props.date,
    //   notRead: this.props.props.notRead,
    //   selected: typeof this.props.props.selected !== 'undefined'
    // }
    return this.compile(tpl, this.props.props);
  }
}
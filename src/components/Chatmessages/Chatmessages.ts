import Block from '../../modules/Block';
import { Props } from '../../types/global';
import tpl from './Chatmessages.tpl';

export class Chatmessages extends Block {
  constructor(props: Props) {
    super({
      ...props
    });
  }
  
  render() {
    return this.compile(tpl, {
      author: this.props.author,
      datetime: this.props.datetime,
      type: this.props.type,
      body: this.props.body,
      read: this.props.read
    });
  }
}
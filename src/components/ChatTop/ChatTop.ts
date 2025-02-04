import Block from '../../modules/Block';
import tpl from './ChatTop.tpl';

export class ChatTop extends Block {
  render() {
    return this.compile(tpl, {});
  }
}

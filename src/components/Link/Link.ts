import Block from '../../modules/Block';
import tpl from './Link.tpl';

export class Link extends Block {
  render() {
    return this.compile(tpl, {
      class: this.props.class,
      link: this.props.link,
      text: this.props.text,
    });
  }
}

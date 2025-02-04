import Block from '../../modules/Block';
import { StringIndexed } from '../../types/global';
import tpl from './TextBlock.tpl';

export class TextBlock extends Block {
  constructor(props: StringIndexed) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

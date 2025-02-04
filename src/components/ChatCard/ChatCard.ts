import Block from '../../modules/Block';
import { Indexed, Props } from '../../types/global';
import tpl from './ChatCard.tpl';

export class ChatCard extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    const props: Indexed = {};
    Object.keys(this.props).forEach((key) => {
      props[key as unknown as string] = this.props[key];
    });

    return this.compile(tpl, props);
  }
}

import Block from '../../modules/Block';
import tpl from './ProfileRow.tpl';
import { Props } from '../../types/global';

export class ProfileRow extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(tpl, {
      label: this.props.label,
      value: this.props.value,
    });
  }
}

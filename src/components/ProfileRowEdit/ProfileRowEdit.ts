import Block from '../../modules/Block';
import tpl from './ProfileRowEdit.tpl';
import { Props, IProfileEdit } from '../../types/global';
import { focusOutById, focusInById } from '../../utils/validation';

export class ProfileRowEdit extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        focusout: () => focusOutById(this.props.id),
        focusin: () => focusInById(this.props.id)
      }
    });
  }
  
  render() {
    const props: IProfileEdit = {
      label: this.props.label,
      value: this.props.value,
      type: this.props.type,
      name: this.props.name,
      id: this.props.name
    }
    if (typeof this.props.rule !== 'undefined') {
      props.rule = this.props.rule;
    }
    return this.compile(tpl, props);
  }
}

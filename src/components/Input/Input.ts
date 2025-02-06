import Block from '../../modules/Block';
import tpl from './Input.tpl';
import { focusOutById, focusInById } from '../../utils/validation';

interface IInputProps {
  label: string,
  id: string,
  name: string,
  type: string,
  placeholder?: string,
  value?: string,
  rule?: string,
  events?: unknown
}

export class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        focusout: () => focusOutById(this.props.id),
        focusin: () => focusInById(this.props.id),
        ...(props.events ?? {}),
      },
    });
  }

  render() {
    const props: IInputProps = {
      label: this.props.label,
      id: this.props.id,
      name: this.props.name,
      type: this.props.type,
    };
    if (this.props.placeholder) {
      props.placeholder = this.props.placeholder;
    }
    if (this.props.value) {
      props.value = this.props.value;
    }
    if (this.props.rule) {
      props.rule = this.props.rule;
    }

    return this.compile(tpl, props);
  }
}

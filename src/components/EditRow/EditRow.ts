import Block from "../../modules/Block";
import { Props } from "../../types/global";
import { Input } from "../Input/Input";
import tpl from './EditRow.tpl';

export class EditRow extends Block {
  constructor(props: Props) {
    super({
      ...props
    });
  }

  protected childrenInit() {
    this.children.input = new Input({
      label: this.props.label,
      id: this.props.id,
      name: this.props.name,
      type: this.props.type,
      value: this.props.value ?? '',
      rule: this.props.rule ?? ''
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
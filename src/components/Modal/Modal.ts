import Block from "../../modules/Block";
import { IModal } from "../../types/global";
import tpl from './Modal.tpl';

export class Modal extends Block {
  constructor(props: IModal) {
    super({
      ...props
    });
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
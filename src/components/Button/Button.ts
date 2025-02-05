import Block from '../../modules/Block';
import tpl from './Button.tpl';

interface IButtonProps {
  id: string,
  class: string,
  link?: string,
  type?: string,
  inner: string,
  events?: {
    click?: (e?: Event) => void;
  },
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
    });
  }

  render() {
    const props: IButtonProps = {
      id: this.props.id,
      class: this.props.class,
      inner: this.props.inner,
    };
    if (this.props.link) {
      props.link = this.props.link;
    }
    if (this.props.type) {
      props.type = this.props.type;
    }

    return this.compile(tpl, props);
  }
}

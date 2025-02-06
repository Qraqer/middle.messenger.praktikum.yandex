import Block from '../../modules/Block';
import tpl from './Link.tpl';
import Router from '../../modules/Router';

export interface ILinkProps {
  class: string;
  link: string;
  inner: string;
}

export class Link extends Block {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          this.go();
        },
      },
    });
  }

  go() {
    (new Router()).go(this.props.link);
  }

  render() {
    return this.compile(tpl, {
      class: this.props.class,
      link: this.props.link,
      inner: this.props.inner,
    });
  }
}

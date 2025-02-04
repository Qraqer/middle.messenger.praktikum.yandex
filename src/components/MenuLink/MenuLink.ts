import Block from '../../modules/Block';
import tpl from './MenuLink.tpl';

export class MenuLink extends Block {
  render() {
    return this.compile(tpl, {});
  }
}

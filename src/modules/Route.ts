import render from '../utils/render';
import Block from './Block';
import { StringIndexed } from '../types/global';

export default class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block<any> | null;
  private _props: StringIndexed;

  constructor(pathname: string, view: typeof Block, props: any) {
      this._pathname = pathname;
      this._blockClass = view;
      this._block = null;
      this._props = props;
  }

  navigate(pathname: string) {
      if (this.match(pathname)) {
        this._pathname = pathname;
        this.render();
      }
  }

  leave() {
    this._block = null;
  }

  match(pathname: string) {
      return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
    }
    render(this._props.rootQuery, this._block);
  }
}
import Block from '../../modules/Block';
import tpl from './FileInput.tpl';

interface IAvatar {
  id: string;
  name: string;
}

export class FileInput extends Block {
  constructor(props: IAvatar) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

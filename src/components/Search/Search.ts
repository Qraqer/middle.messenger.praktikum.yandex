import Block from '../../modules/Block';
import tpl from './Search.tpl';

export class Search extends Block {
  render() {
    setTimeout(() => {
      const search = document.querySelector('.input__text');
      if (search) {
        search.addEventListener('focus', this.setInputFocusHandler);
        search.addEventListener('blur', this.setInputBlurHandler);
      }
    }, 100);

    return this.compile(tpl, {});
  }

  setInputFocusHandler(event: Event) {
    const parent = (event.target as HTMLTextAreaElement)?.closest('.js-input');
    if (parent) {
      parent.classList.add('is--active');
    }
  }

  setInputBlurHandler(event: Event) {
    if ((event.target as HTMLTextAreaElement)?.value === '') {
      const parent = (event.target as HTMLTextAreaElement)?.closest('.js-input');
      if (parent) {
        parent.classList.remove('is--active');
      }
    }
  }
}

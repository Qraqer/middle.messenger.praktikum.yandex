import Block from '../modules/Block';
import { StringIndexed } from '../types/global';

export default function render(query: string, block: Block<StringIndexed>) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';
  root.append(block.getContent() as HTMLDivElement);
  // block.componentDidMount();

  return root;
}

import { assert } from 'chai';
import { TextBlock } from './TextBlock';

describe('TextBlock', () => {
  it('expects render', () => {
    const mock = new TextBlock({ innerText: 'test' });
    assert.equal(mock.getContent()?.innerHTML, 'test');
  });
});

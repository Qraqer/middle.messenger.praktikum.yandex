import { assert } from 'chai';
import { test } from 'mocha';
import { TextBlock } from '../components/TextBlock/TextBlock';

const mock = new TextBlock({ innerText: 'test' });

describe('Block', () => {
  test('expects correct render of block', () => {
    assert.equal(mock.getContent()?.innerHTML, 'test');
  });

  test('expects render of tag "div"', () => {
    assert.equal(mock.getContent()?.tagName, 'DIV');
  });
});

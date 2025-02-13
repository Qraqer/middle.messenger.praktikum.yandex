import { expect } from 'chai';
import * as sinon from 'sinon';
import { router } from './Router';

describe('Router', () => {
  const getContentFake = sinon.fake.returns(document.createElement('div'));
  const BlockMock = class {
    getContent = getContentFake;
  };
  const originForward = window.history.forward;
  const originBack = window.history.back;

  beforeEach(() => {
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();
  });

  afterEach(() => {
    router.unset();
    window.history.forward = originForward;
    window.history.back = originBack;
  });

  it('expecting Router instance after calling use()', () => {
    const use = router.use('/', BlockMock);
    expect(use).to.eq(router);
  });

  it('expecting rendering page on start', () => {
    router.use('/', BlockMock).start();
    expect(getContentFake.callCount).to.eq(1);
  });

  it('expecting forward', () => {
    router.forward();
    expect((window.history.forward as any).callCount).to.eq(1);
  });

  it('expecting back', () => {
    router.back();
    expect((window.history.back as any).callCount).to.eq(1);
  });
});

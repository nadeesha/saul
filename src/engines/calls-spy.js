import { expect } from 'chai';
import mocha from 'mocha';
import sinon from 'sinon';

export default (
  testDescription: string,
  func: Function,
  argsArray: Array<any>,
  expected: string,
  test: (desc: string, fn: () => void) => void
) => {
  test(testDescription, () => {
    const injectableSpy = sinon.spy();

    const argsWithSpy = argsArray.map(
      arg => (arg && arg.indexOf('spy') === 0 ? injectableSpy : arg)
    );

    func.apply(null, argsWithSpy);

    expect(injectableSpy.called).to.equal(true);
  });
};

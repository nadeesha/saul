import { expect } from 'chai';
import assert from 'assert';

// @t "woo" testEvalSpy(spy('bar')) ~expect expect(spy('bar').calledOnce).to.equal(true)
// @t "woo" testEvalSpy(spy('baz'), {leet: 1337}) ~expect expect(spy('baz').args[0]).to.eql(['foo', {leet: 1337}])
// @t "woo" testEvalSpy(spy('far')) ~expect spy('far').calledOnce
export function testEvalSpy (fn, obj) {
  fn('foo', obj);
}

/* istanbul ignore next */
export default (
  testDescription: string,
  func: Function,
  argsArray: Array<any>,
  expected: string,
  test: (desc: string, fn: () => void) => void,
  { getSpy }
) => {
  test(testDescription, () => {
    const result = func.apply(null, argsArray);
    const spy = getSpy;

    (function evaluate () {
      // eslint-disable-next-line no-eval
      eval(
        `
        const expect = this.expect;
        const assert = this.assert;
        const spy = this.spy;
        const $result = this.result;

        ${expected.indexOf('expect(') > 0 ? expected : `assert(${expected})`}
        `
      );
    }.call({
      expect,
      spy,
      assert,
      result
    }));
  });
};

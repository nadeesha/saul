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

import { expect } from 'chai';

export default (
  testDescription: string,
  func: Function,
  argsArray: Array<any>,
  expected: string,
  test: (desc: string, fn: () => void) => void
) => {
  test(testDescription, () => {
    const actual = func.apply(null, argsArray);
    // must eval ( var ) it because eval({foo: 'bar'}) goes bar
    expect(actual).to.eql(eval(`var trouble = ${expected}; trouble`)); // eslint-disable-line no-eval
  });
};

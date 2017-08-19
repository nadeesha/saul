import { expect } from 'chai';

/* istanbul ignore next */
export default (
  testDescription: string,
  func: Function,
  argsArray: Array<any>,
  expected: string,
  test: (desc: string, fn: () => void) => void
) => {
  console.warn(
    'Warning: ~equals is being deprecated in favor of ~equals. Please update your references as this will be removed in a future release'
  );

  test(testDescription, () => {
    const actual = func.apply(null, argsArray);
    // must eval ( var ) it because eval({foo: 'bar'}) goes bar
    expect(actual).to.eql(eval(`var trouble = ${expected}; trouble`)); // eslint-disable-line no-eval
  });
};

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
    expect(actual).to.contain(eval(`${expected}`)); // eslint-disable-line no-eval
  });
};

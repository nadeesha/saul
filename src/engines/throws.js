import { expect } from 'chai';

export default (
  testDescription: string,
  func: Function,
  argsArray: Array<any>,
  expected: string
) => {
  it(testDescription, () => {
    const actual = func.apply(null, argsArray);
    expect(actual).to.throw(eval(`${expected}`));
  });
};

import { expect } from 'chai';
import mocha from 'mocha';

export default (
  testDescription: string,
  func: Function,
  argsArray: Array<any>,
  expected: string
) => {
  mocha.it(testDescription, () => {
    const actual = func.apply(null, argsArray);
    expect(actual).to.eql(eval(`${expected}`));
  });
};

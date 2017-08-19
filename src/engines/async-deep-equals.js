import { expect } from 'chai';

// @t "returns object bar" testAsyncDeepEquals() ~async-deep-equals { foo: 'bar' }
export function testAsyncDeepEquals() {
  return new Promise((resolve, reject) => {
    resolve({ foo: 'bar' });
  });
}

export default (
  testDescription: string,
  func: Function,
  argsArray: Array <any>,
  expected: string,
  test: (desc: string, fn: () => void) => void
) => {
  test(testDescription, () => {
    return func.apply(null, argsArray).then(actual => {
      expect(actual).to.eql(eval(`var trouble = ${expected}; trouble`)); // eslint-disable-line no-eval
    });
  });
};

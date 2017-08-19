import { expect } from 'chai';
import _ from 'lodash';

// @t "testEqualsAsync" testEqualsAsync() ~equals 1
export function testEqualsAsync() {
  return new Promise((resolve, reject) => {
    resolve(1);
  });
}

// @t "testEquals" testEquals() ~equals { "foo": "bar" }
export function testEquals() {
  return { foo: 'bar' };
}

/* istanbul ignore next */
export default (
  testDescription: string,
  func: Function,
  argsArray: Array<any>,
  expected: string,
  test: (desc: string, fn: () => void) => void
) => {
  test(testDescription, (done = _.noop) => {
    const actual = func.apply(null, argsArray);

    const isPromise = !!actual.then;

    // must eval with var assignment it because eval({foo: 'bar'}) goes bar
    const assert = value =>
      expect(value).to.eql(eval(`var out = ${expected}; out`)); // eslint-disable-line no-eval

    if (isPromise) {
      return actual.then(actual => {
        assert(actual);
        done();
      });
    }

    assert(actual);
  });
};

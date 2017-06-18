import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import assert from 'assert';

export default (
  testDescription: string,
  component: Function,
  argsArray: Array<any>,
  expected: string,
  test: (desc: string, fn: () => void) => void,
  { getSpy }
) => {
  test(testDescription, () => {
    const wrapper = shallow(React.createElement(component, argsArray[0]));
    const spy = getSpy;

    (function evaluate () {
      // eslint-disable-next-line no-eval
      eval(
        `
        const expect = this.expect;
        const assert = this.assert;
        const wrapper = this.wrapper;
        const spy = this.spy;

        ${expected.indexOf('expect(') > 0 ? expected : `assert(${expected})`}
        `
      );
    }.call({
      expect,
      spy,
      assert,
      wrapper
    }));
  });
};

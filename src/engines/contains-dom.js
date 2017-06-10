import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import { expand } from '@emmetio/expand-abbreviation';
import unescape from 'unescape';

export default (
  testDescription: string,
  component: Function,
  argsArray: Array<any>,
  expected: string,
  test: (desc: string, fn: () => void) => void
) => {
  test(testDescription, () => {
    const wrapper = shallow(React.createElement(component, argsArray[0]));
    const actual = wrapper.html();
    expect(unescape(actual).replace('/>', '>')).to.contain(expand(expected));
  });
};

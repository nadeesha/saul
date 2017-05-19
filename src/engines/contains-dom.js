import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import { expand } from '@emmetio/expand-abbreviation';
import mocha from 'mocha';

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
    expect(actual).to.contain(expand(expected));
  });
};

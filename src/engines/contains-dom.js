import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import { expand } from '@emmetio/expand-abbreviation';

export default (
  testDescription: string,
  component: Function,
  argsArray: Array<any>,
  expected: string
) => {
  it(testDescription, () => {
    const wrapper = shallow(React.createElement(component, argsArray[0]));
    const actual = wrapper.html();
    expect(actual).to.contain(expand(expected));
  });
};

import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import { expand } from '@emmetio/expand-abbreviation';
import _ from 'lodash';

export default (
  testDescription: string,
  component: Function,
  argsArray: Array<any>,
  expected: string
) => {
  it(testDescription, () => {
    const wrapper = shallow(React.createElement(component, argsArray[0]));
    const actual = wrapper.html();
    // emmet formats and indents expansion.
    // therefore, remove the \s using regex
    expect(actual).to.equal(expand(expected).replace(/>(\s)*</g, '><'));
  });
};

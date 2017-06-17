import { composeParams } from './parse';
import { expect } from 'chai';
import tests from './parse.test.json';

describe('composeParams', () => {
  tests.forEach(test =>
    it(`with test def ${test.testDefinition}`, () => expect(composeParams(test.testDefinition)).to.eql([test.params]))
  );
});

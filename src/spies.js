import sinon from 'sinon';

const generated = {};

// @t "gets existing spy"
//    getSpy('iSpy', { 'iSpy': { name: 1337 } }, () => {}) ~equals { name: 1337 }
export const getSpy = (name, collection = generated) => {
  if (collection[name]) {
    return collection[name];
  }

  throw new Error(`Could not find spy: ${name}`);
};

// @t "generates a new spy"
//    generateSpy('spyName', {}, {}) ~equals { _saul_type: 'spy', _saul_name: 'spyName' }
// @t "throws on existing spy name"
//    generateSpy('existingSpy', { 'existingSpy': {} }, {}) ~throws true
export const generateSpy = (
  name,
  collection = generated,
  newSpy = sinon.spy()
) => {
  if (collection[name]) {
    throw new Error(`Spy name ${name} is already taken.`);
  }

  const spy = Object.assign(newSpy, {
    _saul_type: 'spy',
    _saul_name: name
  });

  collection[name] = spy;

  return spy;
};

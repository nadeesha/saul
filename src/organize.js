import fs from 'fs';
import { TestParams, ExecutableParams } from './types';

require('babel-register');

// @t "gets correct function" getTestableFunction('foo', 'bar', () => ({'bar': 'baz'})) equals 'baz'
export const getTestableFunction = (
  filepath: string,
  funcName: string,
  requireFile = require
): Function => {
  const module = requireFile(filepath);
  return module[funcName];
};

// @t "parses correctly" parseArgs(0) deep-equals [0]
export const parseArgs = (argsString: string): Array<any> =>
  eval(`[${argsString}]`);

// @t "gets engine" getEngineModule('foo', () => ({ default: 'bar' })) equals 'bar'
// @t "throws on bad engine" getEngineModule('bad', () => null) throws 'Engine: bad is not valid'
export const getEngineModule = (engineName, requireFile = require) => {
  try {
    return requireFile(`./engines/${engineName}.js`).default;
  } catch (e) {
    throw new Error(`Engine: ${engineName} is not valid`);
  }
};

export default (
  filepath: string,
  testParams: TestParams
): ExecutableParams => ({
  function: getTestableFunction(filepath, testParams.funcName),
  testDescription: testParams.testDescription,
  args: parseArgs(testParams.args),
  engine: require(`./engines/${testParams.engineName}.js`).default,
  output: testParams.output
});

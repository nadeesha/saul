import fs from 'fs';
import { TestParams, ExecutableParams } from './types';
import { getConfig } from './config';
import path from 'path';

require('babel-register');

// @t "gets correct function" getTestableFunction('foo', 'bar', () => ({'bar': 'baz'})) equals 'baz'
export const getTestableFunction = (filepath: string, funcName: string, requireFile = require): Function => {
  const module = requireFile(filepath);
  return module[funcName];
};

// @t "parses correctly" parseArgs("0") deep-equals [0]
// @t "parses multiple values" parseArgs("12, 15") deep-equals [12, 15]
export const parseArgs = (argsString: string): Array<any> => {
  try {
    return eval(`[${argsString}]`); // eslint-disable-line no-eval
  } catch (e) {
    throw new Error(`Possible syntax error in your args: ${argsString}`);
  }
};

export const getEngineModule = (engineName, requireFile = require) => {
  try {
    const userModule = path.join(process.cwd(), getConfig().customEnginesDir, `${engineName}.js`);

    if (fs.statSync(userModule) && requireFile(userModule).default) {
      return requireFile(userModule).default;
    }
  } catch (e) {
    try {
      return requireFile(`./engines/${engineName}.js`).default;
    } catch (e) {
      return null;
    }
  }
};

export default (filepath: string, testParams: TestParams): ExecutableParams => ({
  function: getTestableFunction(filepath, testParams.funcName),
  testDescription: testParams.testDescription,
  args: parseArgs(testParams.args),
  engine: getEngineModule(testParams.engineName),
  output: testParams.output
});

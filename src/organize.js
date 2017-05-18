import fs from 'fs';
import { TestParams, ExecutableParams } from './types';

require('babel-register');

const getTestableFunction = (filepath: string, funcName: string): Function => {
  const module = require(filepath);
  return module[funcName];
};

const parseArgs = (argsString: string): Array<any> => eval(`[${argsString}]`);

const getEngineModule = engineName => {
  try {
    return require(`./engines/${testParams.engineName}.js`).default;
  } catch (e) {
    throw new Error(`Engine: ${engineFile} is not valid`);
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

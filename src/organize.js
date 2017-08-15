import fs from 'fs';
import { TestParams, ExecutableParams } from './types';
import { getConfig } from './config';
import path from 'path';
import _ from 'lodash';
import { generateSpy } from './spies';

require('babel-register');

// @t "with normal export"    getTestableFunction('foo', 'bar', () => ({'bar': 'baz'})) ~equals 'baz'
// @t "with nested export"    getTestableFunction('foo', 'bar.good', () => ({'bar': { 'good': 'sogood' }})) ~equals 'sogood'
export const getTestableFunction = (
  filepath: string,
  funcName: string,
  requireFile = require,
  get = _.get
): Function => {
  const module = requireFile(filepath);
  return get(module, funcName);
};

const getArgsContext = () => ({
  spy: generateSpy
});

function parseArgsFn(argsString: string) {
  try {
    // eslint-disable-next-line no-eval
    return eval(
      `
      const spy = this.spy;
      [${argsString}]
    `
    );
  } catch (e) {
    throw new Error(`Possible syntax error in your args: ${argsString}`);
  }
}

// @t "parses correctly"            parseArgs("0") ~deep-equals [0]
// @t "parses multiple values"      parseArgs("12, 15") ~deep-equals [12, 15]
// @t "accepts spies"               parseArgs("spy('foo'), 15") ~throws false
// @t "throws on invalid spies"     parseArgs("spyz('0'), 15") ~throws true
export const parseArgs = parseArgsFn.bind(getArgsContext());

export const getEngineModule = (engineName, requireFile = require) => {
  try {
    const userModule = path.join(
      process.cwd(),
      getConfig().customEnginesDir,
      `${engineName}.js`
    );

    if (fs.statSync(userModule) && requireFile(userModule).default) {
      return requireFile(userModule).default;
    }
  } catch (e) {
    return requireFile(`./engines/${engineName}.js`).default;
  }
};

export default (
  filepath: string,
  testParams: TestParams
): ExecutableParams => ({
  function: getTestableFunction(filepath, testParams.funcName),
  testDescription: testParams.testDescription,
  args: parseArgs(testParams.args),
  engine: getEngineModule(testParams.engineName),
  output: testParams.output
});

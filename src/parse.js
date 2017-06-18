import _ from 'lodash';
import fs from 'fs';

import { TestParams } from './types';

// @t "reads file" getFileContent('fakeFilePath', 'spyFoo') ~calls-spy-with fakeFilePath
export const getFileContent = (filepath: string, readFile: typeof fs.readFileSync = fs.readFileSync): string =>
  readFile(filepath, 'utf-8');

// @t "not foo" composeArgs(['1', '2']) ~is-not foo
export const composeArgs = (match: string[]): TestParams => {
  const [fullMatch, testDescription, funcName, args, engineName, output] = match; // eslint-disable-line no-unused-vars

  return {
    args,
    engineName,
    funcName,
    output,
    testDescription
  };
};

export const composeParams = (fileContent: string): Array<TestParams> => {
  const testLine: RegExp = /(?:\/\/\s@t\s)(".*")(?:[^\w])+([\w|\.]+)\((.*)(?:\)[^\w])+~((?:\w|-)+)(?:[\s])+(.+)/g;

  let match;
  let paramsArray = [];

  while ((match = testLine.exec(fileContent)) !== null) {
    paramsArray.push(composeArgs(match));
  }

  return paramsArray;
};

/* istanbul ignore next */
const parse = (filepath: string): Array<TestParams> => {
  try {
    return _(filepath).thru(getFileContent).thru(composeParams).value();
  } catch (e) {
    throw new Error('Error parsing your test files');
  }
};

export default parse;

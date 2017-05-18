import * as babylon from 'babylon';
import _ from 'lodash';
import fs from 'fs';

import { TestParams } from './types';

const getFileContent = (filepath: string): string =>
  fs.readFileSync(filepath, 'utf-8');

const composeArgs = (match: string[]): TestParams => {
  const [
    fullMatch,
    testDescription,
    funcName,
    args,
    engineName,
    output
  ] = match;

  return {
    args,
    engineName,
    funcName,
    output,
    testDescription
  };
};

const composeParams = (fileContent: string): Array<TestParams> => {
  const testLine: RegExp = /\/\/\s@t(?:\s|.)+?(".+?"){0,1}(?:\s|.)+?((?:\w)+)\((.*)\)(?:\s|.)+?((?:\w|\d|-)+)(?:\s|.!\w)+(.*)/g;

  let match;
  let paramsArray = [];

  while ((match = testLine.exec(fileContent)) !== null) {
    paramsArray.push(composeArgs(match));
  }

  return paramsArray;
};

const parse = (filepath: string): Array<TestParams> => {
  return _(filepath).thru(getFileContent).thru(composeParams).value();
};

export default parse;

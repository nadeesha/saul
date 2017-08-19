#!/usr/bin/env node
import _ from 'lodash';
import parse from './parse';
import organize from './organize';
import execute from './execute';
import { getTestableFiles } from './file';
import { getConfig } from './config';

const safelyExecute = (fn, taskName) => (...args) => {
  try {
    return fn(...args);
  } catch (e) {
    console.error('\x1b[31m', `Error ${taskName}: \n${e.message}`);
    console.log('\x1b[0m'); // reset color
    process.exit(1);
  }
};

const processFile = path =>
  _(path)
    .thru(safelyExecute(parse, 'parsing files'))
    .thru(testParamsArray =>
      _.map(
        testParamsArray,
        safelyExecute(params => organize(path, params), 'organizing tests')
      )
    )
    .thru(safelyExecute(execute, 'executing test'))
    .commit();

getTestableFiles(getConfig().fileGlob).forEach(processFile);

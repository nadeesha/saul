#!/usr/bin/env node
import _ from 'lodash';
import parse from './parse';
import organize from './organize';
import execute from './execute';
import { getTestableFiles } from './file';
import { getConfig } from './config';

const processFile = path =>
  _(path)
    .thru(parse)
    .thru(testParamsArray => _.map(testParamsArray, params => organize(path, params)))
    .thru(execute)
    .commit();

getTestableFiles(getConfig().fileGlob).forEach(processFile);

#!/usr/bin/env node
import { argv } from 'optimist';
import _ from 'lodash';
import parse from './parse';
import organize from './organize';
import execute from './execute';
import config from './config';
import { ExecutableParams, TestParams } from './types';
import glob from 'glob';
import { getTestableFiles } from './file';
import path from 'path';
import fs from 'fs';
import { getConfig } from './config';

const processFile = path =>
  _(path)
    .thru(parse)
    .thru(testParamsArray =>
      _.map(testParamsArray, params => organize(path, params))
    )
    .thru(execute)
    .commit();

getTestableFiles(getConfig().fileGlob).forEach(processFile);

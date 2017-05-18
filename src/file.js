import glob from 'glob-fs';
import fs from 'fs';
import process from 'process';
import path from 'path';

const isFile = filePath => fs.lstatSync(filePath).isFile();

const toFullPath = filePath => path.join(process.cwd(), filePath);

export const getTestableFiles = (globString: string): string[] =>
  glob().readdirSync(globString).filter(isFile).map(toFullPath);

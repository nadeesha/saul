import fs from 'fs';
import path from 'path';

let config;

export const getConfig = () => {
  if (config) {
    return config;
  }

  try {
    const configString = fs.readFileSync(
      path.join(__dirname, '.saulconfig'),
      'utf-8'
    );

    config = JSON.parse(configString);
  } catch (e) {
    config = {
      fileGlob: '**/*.js'
    };
  }

  return config;
};

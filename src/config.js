import fs from 'fs';
import path from 'path';

type Config = {
  fileGlob: string
};

let config: Config;

// @t "gets existing config" getConfig({foo: "bar"}) deep-equals {foo: 'bar'}
// @t "must read and get config"
//     getConfig(null, () => ('{"good": "config"}'), 'fakePath') deep-equals {good: 'config'}
// @t "must return default config on bad config"
//     getConfig(null, () => ('{"bad: "config"}'), 'fakePath') deep-equals {fileGlob: '**/*.js'}
export const getConfig = (
  existingConfig: Config = config,
  readFile: typeof fs.readFileSync = fs.readFileSync,
  configPath: string = path.join(__dirname, '.saulconfig')
): Config => {
  if (existingConfig) {
    return existingConfig;
  }

  try {
    const configString = readFile(configPath, 'utf-8');
    config = JSON.parse(configString);
  } catch (e) {
    config = {
      fileGlob: '**/*.js'
    };
  }

  return config;
};

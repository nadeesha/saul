import fs from 'fs';
import path from 'path';
import process from 'process';

type Config = {
  fileGlob: string
};

let config: Config;

const configFileName = '.saulrc';

// @t "gets existing config" getConfig({foo: "bar"}) ~deep-equals {foo: 'bar'}
// @t "must read and get config"
//     getConfig(null, () => '{"good": "config"}', 'fakePath') ~deep-equals {good: 'config'}
// @t "must return default config on bad config"
//     getConfig(null, null, 'fakePath') ~deep-equals {fileGlob: '**/*.js'}
export const getConfig = (
  existingConfig: Config = config,
  readFile: typeof fs.readFileSync = fs.readFileSync,
  configPath: string = path.join(process.cwd(), configFileName)
): Config => {
  if (existingConfig) {
    return existingConfig;
  }

  try {
    config = JSON.parse(readFile(configPath, 'utf-8'));
  } catch (e) {
    console.log(`Warning: Could not find a valid .saulrc in ${process.cwd()}`);

    config = {
      fileGlob: '**/*.js'
    };
  }

  return config;
};

import fs from 'fs';
import path from 'path';
import process from 'process';

type Config = {
  fileGlob: string
};

let config: Config;

// @t "gets existing config" getConfig({foo: "bar"}) deep-equals {foo: 'bar'}
// @t "must read and get config"
//     getConfig(null, () => ({good: 'config'}), 'fakePath') deep-equals {good: 'config'}
// @t "must return default config on bad config"
//     getConfig(null, null, 'fakePath') deep-equals {fileGlob: '**/*.js'}
export const getConfig = (
  existingConfig: Config = config,
  requireFile: typeof require = require,
  configPath: string = path.join(process.cwd(), 'saulconfig.json')
): Config => {
  if (existingConfig) {
    return existingConfig;
  }

  try {
    config = requireFile(configPath);
  } catch (e) {
    config = {
      fileGlob: '**/*.js'
    };
  }

  return config;
};

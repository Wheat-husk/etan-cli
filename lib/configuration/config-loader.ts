import { ReadFile } from '../readFile';
import { Configuration } from './configuration';
import { defaultConfig } from './default';

export class ConfigurationLoder {
  constructor(readonly readFile: ReadFile) {}
  load(configPath?: string): Configuration {
    const cliConfig = this.readFile.load(configPath || 'etan-cli.json');
    if (!cliConfig) return defaultConfig;
    return {
      ...defaultConfig,
      ...cliConfig,
    };
  }
}

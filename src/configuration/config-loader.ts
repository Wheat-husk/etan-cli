import { JsonFileReader } from '../readFile';
import { Configuration } from './configuration';
import { defaultConfig } from './default';

export class ConfigurationLoder {
  constructor(readonly readFile: JsonFileReader) {}
  async load(configPath?: string): Promise<Configuration> {
    const cliConfig = await this.readFile.read(configPath || 'etan-cli.json');
    if (!cliConfig) return defaultConfig;
    return {
      ...defaultConfig,
      ...cliConfig,
    };
  }
}

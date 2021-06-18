import * as fs from 'fs';
import { join } from 'path';
import { Configuration } from '../configuration';
import { CLI_ERRORS } from '../ui/error';

export class ReadFile {
  constructor(readonly root: string) {}
  load(fileName: string): Configuration {
    const filepath = join(this.root, fileName);
    if (!fs.existsSync(filepath))
      throw new Error(CLI_ERRORS.CONFIG_FILE(fileName));
    try {
      return require(filepath);
    } catch (error) {
      throw new Error(error);
    }
  }
}

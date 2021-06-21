import { join } from 'path';
import { Configuration } from '../configuration';

export class JsonFileReader {
  constructor(readonly root: string) {}
  async read(fileName: string): Promise<Configuration | undefined> {
    return new Promise((resolve, reject) => {
      try {
        const filepath = join(this.root, fileName);
        resolve(require(filepath));
      } catch (error) {
        resolve(undefined);
      }
    });
  }
}

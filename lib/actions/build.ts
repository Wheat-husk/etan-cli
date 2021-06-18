import { TypeScriptBinaryLoader } from '../compiler/typescript-loader';
import { WatchComplier } from '../compiler/watch-compiler';
import { ConfigurationLoder } from '../configuration';
import { ReadFile } from '../readFile';

export class Build {
  readonly root = process.cwd();
  readonly tsLoader = new TypeScriptBinaryLoader();
  readonly readFile = new ReadFile(this.root);
  readonly configLoader = new ConfigurationLoder(this.readFile);
  readonly watchComplier = new WatchComplier(this.tsLoader);
  public async runComplier(tsConfigPath: string, onSuccess?: () => void) {
    return this.watchComplier.run(tsConfigPath, onSuccess);
  }
}

import { Options } from '../commands';
import { ConfigurationLoder } from '../configuration';
import { JsonFileReader } from '../readFile';
import { ProcessKillLoader } from '../KillProcess';
import { Compiler, WatchComplier, TypeScriptBinaryLoader } from '../compiler';
export abstract class AbstractAction {
  readonly root = process.cwd();
  readonly killLoader = new ProcessKillLoader();
  readonly tsLoader = new TypeScriptBinaryLoader();
  readonly readFile = new JsonFileReader(this.root);
  readonly configLoader = new ConfigurationLoder(this.readFile);
  readonly compiler = new Compiler(this.tsLoader);
  readonly watchComplier = new WatchComplier(this.tsLoader);
  public abstract handle(options?: Options): Promise<void>;
}

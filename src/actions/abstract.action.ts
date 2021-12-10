import { TypeScriptBinaryLoader } from '../binary';
import { BuildOptions, StartOptions } from '../commands';
import { Compiler, WatchComplier } from '../compiler';
import { ConfigurationLoder } from '../configuration';
import { ProcessKillLoader } from '../KillProcess';
import { JsonFileReader } from '../readFile';
import { CLI_ERRORS } from '../ui/error';

export abstract class AbstractAction {
  protected readonly root = process.cwd();
  protected readonly killLoader = new ProcessKillLoader();
  protected readonly tsLoader = new TypeScriptBinaryLoader();
  protected readonly readFile = new JsonFileReader(this.root);
  protected readonly configLoader = new ConfigurationLoder(this.readFile);
  protected readonly compiler = new Compiler(this.tsLoader);
  protected readonly watchComplier = new WatchComplier(this.tsLoader);

  public abstract handle(options?: BuildOptions | StartOptions): Promise<void>;

  protected async getConfig(configPath?: string) {
    const tsBinary = this.tsLoader.load();

    const { entryFile, tsConfigPath } = await this.configLoader.load(
      configPath,
    );
    const tsConfigRootPath = tsBinary.findConfigFile(
      this.root,
      tsBinary.sys.fileExists,
      tsConfigPath,
    );
    if (!tsConfigRootPath) {
      throw new Error(CLI_ERRORS.MISSING_TYPESCRIPT(tsConfigPath));
    }

    return {
      entryFile,
      tsConfigRootPath,
    };
  }
}

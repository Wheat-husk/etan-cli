import { spawn } from 'child_process';
import { CompilerOptions } from 'typescript';
import { TypeScriptBinaryLoader } from '../binary';
import { Options } from '../commands';
import { Compiler, WatchComplier } from '../compiler';
import { ConfigurationLoder } from '../configuration';
import { ProcessKillLoader } from '../KillProcess';
import { JsonFileReader } from '../readFile';
import { CLI_ERRORS } from '../ui/error';
import { AbstractAction } from './abstract.action';

export class BuildAction extends AbstractAction {
  readonly root = process.cwd();
  readonly killLoader = new ProcessKillLoader();
  readonly tsLoader = new TypeScriptBinaryLoader();
  readonly readFile = new JsonFileReader(this.root);
  readonly configLoader = new ConfigurationLoder(this.readFile);
  readonly compiler = new Compiler(this.tsLoader);
  readonly watchComplier = new WatchComplier(this.tsLoader);

  public async handle(options: Options) {
    await this.runComplier(options);
  }

  protected async runComplier(options: Options) {
    const tsBinary = this.tsLoader.load();

    const { watch, preserveWatchOutput, config, skip } = options;

    const { entryFile, tsConfigPath } = await this.configLoader.load(config);
    const tsConfigRootPath = tsBinary.findConfigFile(
      this.root,
      tsBinary.sys.fileExists,
      tsConfigPath,
    );
    if (!tsConfigRootPath) {
      throw new Error(CLI_ERRORS.MISSING_TYPESCRIPT(tsConfigPath));
    }

    const onSuccess = this.hooks(entryFile, tsConfigRootPath, options);
    const optionsToExtend: CompilerOptions = {};
    if (watch) {
      if (preserveWatchOutput) {
        optionsToExtend.optionsToExtend = true;
      }
      this.watchComplier.run(tsConfigRootPath, optionsToExtend, onSuccess);
    } else {
      if (skip) {
        onSuccess && onSuccess();
      } else {
        this.compiler.run(tsConfigRootPath, optionsToExtend, onSuccess);
      }
    }
  }

  protected hooks(
    entryPath?: string,
    tsConfigRootPath?: string,
    options?: Options,
  ): () => void;
  protected hooks() {
    return () => {
      this.buildSpawnChildProcess();
    };
  }
  protected buildSpawnChildProcess() {
    return spawn('npx', ['electron-builder', ...process.argv.slice(2)], {
      stdio: 'inherit',
      shell: true,
    });
  }
}

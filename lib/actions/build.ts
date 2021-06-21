import { ChildProcess, spawn } from 'child_process';
import { join } from 'path';
import { Options } from '../commands';
import { TypeScriptBinaryLoader } from '../compiler/typescript-loader';
import { WatchComplier } from '../compiler/watch-compiler';
import { ConfigurationLoder } from '../configuration';
import { JsonFileReader } from '../readFile';
import { CLI_ERRORS } from '../ui/error';
import { AbstractAction } from './abstract.action';

export class BuildAction extends AbstractAction {
  readonly root = process.cwd();
  readonly tsLoader = new TypeScriptBinaryLoader();
  readonly readFile = new JsonFileReader(this.root);
  readonly configLoader = new ConfigurationLoder(this.readFile);
  readonly watchComplier = new WatchComplier(this.tsLoader);
  public async handle(options: Options) {
    const tsBinary = this.tsLoader.load();

    const { watch, debug, preserveWatchOutput, config } = options;
    const { entryFile, tsConfigPath } = await this.configLoader.load(config);

    const tsConfigpath = tsBinary.findConfigFile(
      this.root,
      tsBinary.sys.fileExists,
      tsConfigPath,
    )!;
    if (!tsConfigpath) {
      throw new Error(CLI_ERRORS.MISSING_TYPESCRIPT(tsConfigPath));
    }
    const { options: tsOptions } = tsBinary.getParsedCommandLineOfConfigFile(
      tsConfigpath,
      undefined!,
      tsBinary.sys as unknown as any,
    )!;
    const onSuccess = this.hooks(
      join(tsOptions.outDir!, `${entryFile}.js`),
      debug,
    );

    await this.runComplier(tsConfigpath, onSuccess);
  }

  protected hooks(outputFilePath: string, debug?: boolean | string) {
    return () => {
      this.spawnChildProcess(outputFilePath, debug);
    };
  }

  protected spawnChildProcess(
    outputFilePath: string,
    debug?: boolean | string,
  ): ChildProcess;

  protected spawnChildProcess() {
    return spawn('npx', ['electron-builder', 'build'], {
      stdio: 'inherit',
      shell: true,
    });
  }

  public async runComplier(tsConfigPath: string, onSuccess?: () => void) {
    return this.watchComplier.run(tsConfigPath, onSuccess);
  }
}

import { ChildProcess, spawn } from 'child_process';
import * as killProcess from 'tree-kill';
import { join } from 'path';
import { Options } from '../commands';
import { TypeScriptBinaryLoader } from '../compiler/typescript-loader';
import { WatchComplier } from '../compiler/watch-compiler';
import { ConfigurationLoder } from '../configuration';
import { JsonFileReader } from '../readFile';
import { CLI_ERRORS } from '../ui/error';
import { AbstractAction } from './abstract.action';
import { ProcessKillLoader } from '../KillProcess';

export class BuildAction extends AbstractAction {
  readonly root = process.cwd();
  readonly killLoader = new ProcessKillLoader();
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
    // const { options: tsOptions } = tsBinary.getParsedCommandLineOfConfigFile(
    //   tsConfigpath,
    //   undefined!,
    //   (tsBinary.sys as unknown) as any
    // )!;
    const onSuccess = this.hooks(debug);

    await this.runComplier(tsConfigpath, onSuccess);
  }

  protected hooks(debug?: boolean | string) {
    let electronProcess: any | ChildProcess | undefined;

    process.on('exit', () => electronProcess && electronProcess.kill('SIGINT'));

    return () => {
      if (electronProcess) {
        electronProcess.on('exit', () => {
          electronProcess = this.spawnChildProcess(debug);
          electronProcess.on('exit', () => {
            electronProcess = undefined;
          });
        });
        this.killLoader.kill(electronProcess.pid);
      } else {
        electronProcess = this.spawnChildProcess(debug);
        electronProcess.on('exit', (code: any) => {
          console.log('子进程退出:', code);
          electronProcess = undefined;
        });
      }
    };
  }

  protected spawnChildProcess(debug?: boolean | string): ChildProcess;

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

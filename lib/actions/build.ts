import { ChildProcess, spawn } from 'child_process';
import { Options } from '../commands';
import { CLI_ERRORS } from '../ui/error';
import { AbstractAction } from './abstract.action';
import { CompilerOptions } from 'typescript';

export class BuildAction extends AbstractAction {
  public async handle(options: Options) {
    const onSuccess = this.hooks(options.debug);

    await this.runComplier(options, onSuccess);
  }

  protected hooks(debug?: boolean | string) {
    let electronProcess: any | ChildProcess | undefined;

    process.on(
      'exit',
      () => electronProcess && this.killLoader.kill(electronProcess.pid),
    );

    return () => {
      if (electronProcess) {
        electronProcess.removeAllListeners('exit');
        electronProcess.on('exit', () => {
          electronProcess = this.spawnChildProcess(debug);
          electronProcess.on('exit', () => {
            electronProcess = undefined;
          });
        });
        this.killLoader.kill(electronProcess.pid);
      } else {
        electronProcess = this.spawnChildProcess(debug);
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

  public async runComplier(options: Options, onSuccess?: () => void) {
    const tsBinary = this.tsLoader.load();

    const { watch, preserveWatchOutput, config } = options;

    const { tsConfigPath } = await this.configLoader.load(config);

    const tsConfigRootPath = tsBinary.findConfigFile(
      this.root,
      tsBinary.sys.fileExists,
      tsConfigPath,
    )!;

    const optionsToExtend: CompilerOptions = {};

    if (!tsConfigRootPath) {
      throw new Error(CLI_ERRORS.MISSING_TYPESCRIPT(tsConfigRootPath));
    }

    if (watch) {
      if (preserveWatchOutput) {
        optionsToExtend.optionsToExtend = true;
      }
      this.watchComplier.run(tsConfigRootPath, optionsToExtend, onSuccess);
    } else {
      this.compiler.run(tsConfigRootPath, optionsToExtend, onSuccess);
    }
  }
}

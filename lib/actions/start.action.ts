//http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options
import { ChildProcess, spawn } from 'child_process';
import { join } from 'path';
import { CompilerOptions } from 'typescript';
import { StartOptions } from '../commands';
import { defaultOutDir } from '../configuration';
import { AbstractAction } from './abstract.action';

export class StartAction extends AbstractAction {
  public async handle(options: StartOptions) {
    await this.runComplier(options);
  }
  private async runComplier(options: StartOptions) {
    const { watch, preserveWatchOutput, skip, config } = options;
    const { tsConfigRootPath, entryFile } = await this.getConfig(config);

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

  private hooks(
    entryPath: string,
    tsConfigRootPath: string,
    options: StartOptions,
  ) {
    let electronProcess: any | ChildProcess | undefined;
    // const tsconfig = this.tsLoader.getParsedCommandLine(tsConfigRootPath, {});

    // const outputFile = tsconfig.options.outDir || defaultOutDir || join(
    //   tsconfig.options.outDir || defaultOutDir,
    //   `${entryPath}.js`,
    // );

    process.on(
      'exit',
      () => electronProcess && this.killLoader.kill(electronProcess.pid),
    );
    return () => {
      if (electronProcess) {
        electronProcess.removeAllListeners('exit');
        electronProcess.on('exit', () => {
          electronProcess = this.startSpawnChildProcess(options.debug);
        });
        this.killLoader.kill(electronProcess.pid);
      } else {
        electronProcess = this.startSpawnChildProcess(options.debug);
      }
    };
  }

  private startSpawnChildProcess(debug?: boolean | string) {
    const processArgs = ['electron', '.', '--serve'];

    //chrome://inspect/#devices
    //https://nodejs.org/en/docs/guides/debugging-getting-started/
    if (debug) {
      const inspectFlag =
        typeof debug === 'string' ? `--inspect=${debug}` : '--inspect';
      processArgs.splice(1, 0, inspectFlag);
    }

    const electronProcess = spawn('npx', processArgs, {
      stdio: 'inherit',
      shell: true,
    });

    //child exit
    electronProcess.on('exit', () => {
      //node exit
      process.exit(0);
    });
    return electronProcess;
  }
}

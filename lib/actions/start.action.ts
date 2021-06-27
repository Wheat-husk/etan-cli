//http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options
import { ChildProcess, spawn } from 'child_process';
import { join } from 'path';
import { Options } from '../commands';
import { defaultOutDir } from '../configuration';
import { BuildAction } from './build.action';

export class StartAction extends BuildAction {
  protected hooks(
    entryPath: string,
    tsConfigRootPath: string,
    options: Options,
  ) {
    let electronProcess: any | ChildProcess | undefined;
    const tsconfig = this.tsLoader.getParsedCommandLine(tsConfigRootPath, {});

    const outputFile = join(
      tsconfig.options.outDir || defaultOutDir,
      `${entryPath}.js`,
    );

    process.on(
      'exit',
      () => electronProcess && this.killLoader.kill(electronProcess.pid),
    );
    return () => {
      if (electronProcess) {
        electronProcess.removeAllListeners('exit');
        electronProcess.on('exit', () => {
          electronProcess = this.startSpawnChildProcess(
            outputFile,
            options.debug,
          );
        });
        this.killLoader.kill(electronProcess.pid);
      } else {
        electronProcess = this.startSpawnChildProcess(
          outputFile,
          options.debug,
        );
      }
    };
  }

  protected startSpawnChildProcess(
    entryPath: string,
    debug?: boolean | string,
  ) {
    const processArgs = ['electron', entryPath, '--serve'];

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

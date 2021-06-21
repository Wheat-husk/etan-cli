//http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options
import { spawn } from 'child_process';
import { BuildAction } from './build';

export class StartAction extends BuildAction {
  protected spawnChildProcess(
    outputFilePath: string,
    debug?: boolean | string,
  ) {
    const processArgs = [String(outputFilePath)];

    //chrome://inspect/#devices
    //https://nodejs.org/en/docs/guides/debugging-getting-started/
    if (debug) {
      const inspectFlag =
        typeof debug === 'string' ? `--inspect=${debug}` : '--inspect';
      processArgs.unshift(inspectFlag);
    }

    return spawn('npx', ['electron', '.', '--serve'], {
      stdio: 'inherit',
      shell: true,
    });
  }
}

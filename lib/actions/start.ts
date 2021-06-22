//http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options
import { spawn } from 'child_process';
import { BuildAction } from './build';

export class StartAction extends BuildAction {
  protected spawnChildProcess(debug?: boolean | string) {
    const processArgs = ['electron', '', '.', '--serve'];

    //chrome://inspect/#devices
    //https://nodejs.org/en/docs/guides/debugging-getting-started/
    if (debug) {
      const inspectFlag =
        typeof debug === 'string' ? `--inspect=${debug}` : '--inspect';
      processArgs.splice(1, 0, inspectFlag);
    }
    return spawn('npx', processArgs, {
      stdio: 'inherit',
      shell: true,
    });
  }
}

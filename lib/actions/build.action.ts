import { spawn } from 'child_process';
import { AbstractAction } from './abstract.action';

export class BuildAction extends AbstractAction {
  protected spawnChildProcess() {
    return spawn('npx', ['electron-builder', ...process.argv.slice(2)], {
      stdio: 'inherit',
      shell: true,
    });
  }
}

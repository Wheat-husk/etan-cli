import { spawn } from 'child_process';
import { BuildOptions } from '../commands';
import { AbstractAction } from './abstract.action';

export class BuildAction extends AbstractAction {
  public async handle(options: BuildOptions) {
    await this.runComplier(options);
  }

  protected async runComplier(options: BuildOptions) {
    const { tsConfigRootPath } = await this.getConfig(options.config);

    const onSuccess = this.hooks();
    if (options.skip) {
      onSuccess && onSuccess();
    } else {
      this.compiler.run(tsConfigRootPath, {}, onSuccess);
    }
  }

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

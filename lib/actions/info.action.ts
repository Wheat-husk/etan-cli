import { AbstractAction } from './abstract.action';
import * as os from 'os';
import * as chalk from 'chalk';

export class InfoAction extends AbstractAction {
  readonly node = this.globalCli.load('node');
  readonly npm = this.globalCli.load('npm');
  readonly yarn = this.globalCli.load('yarn');
  public async handle() {
    await this.systemInfo();
    this.cliInfo();
  }
  protected async systemInfo() {
    const nodeV = await this.node.v();
    const yarnV = await this.yarn.v();
    const npmV = await this.npm.v();

    console.info(chalk.green('[System Information]'), '\n');
    console.info('OS Version     :', chalk.blue(os.platform(), os.release()));
    console.info('NodeJS Version :', chalk.blue(nodeV));
    console.info('Npm Version    :', chalk.blue(npmV));
    console.info('Yarn Version   :', chalk.blue(yarnV), '\n');
  }

  protected cliInfo() {
    console.info(chalk.green('[Etan CLI]'), '\n');
    console.info(
      'Etan CLI Version :',
      chalk.blue(require('../../package.json').version),
      '\n',
    );
  }
}

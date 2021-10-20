import * as os from 'os';
import * as chalk from 'chalk';
import { GlobalCliLoader } from '../cli/cli.loader';
import { AbstractAction } from './abstract.action';

export class InfoAction extends AbstractAction {
  private readonly globalCli = new GlobalCliLoader();
  private readonly node = this.globalCli.load('node');
  private readonly npm = this.globalCli.load('npm');
  private readonly yarn = this.globalCli.load('yarn');
  public async handle() {
    await this.systemInfo();
    this.cliInfo();
  }
  private async systemInfo() {
    const nodeV = await this.node.v();
    const yarnV = await this.yarn.v();
    const npmV = await this.npm.v();

    console.info(chalk.green('[System Information]'), '\n');
    console.info('OS Version     :', chalk.blue(os.platform(), os.release()));
    console.info('NodeJS Version :', chalk.blue(nodeV));
    console.info('Npm Version    :', chalk.blue(npmV));
    console.info('Yarn Version   :', chalk.blue(yarnV), '\n');
  }

  private cliInfo() {
    console.info(chalk.green('[Etan CLI]'), '\n');
    console.info(
      'Etan CLI Version :',
      chalk.blue(require('../../package.json').version),
      '\n',
    );
  }
}

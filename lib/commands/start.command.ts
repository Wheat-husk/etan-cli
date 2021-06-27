import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
//https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md
export class StartCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('start')
      .option('-c, --config [path]', 'Path to etan-cli config file.')
      .option(
        '-w, --watch',
        'Run it in watch mode and reload the Electron program after compilation ',
      )
      .option(
        '-d, --debug [hostport] ',
        'Run in debug mode (with --inspect flag).',
      )
      .option(
        '-p, --preserveWatchOutput',
        'Keep the outdated console output in watch mode.',
      )
      .description('Run electron application.')
      .action(async (command) => {
        await this.action.handle(command);
      });
  }
}

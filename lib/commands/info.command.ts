import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';

export class InfoCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('info')
      .description('Display Etan project details.')
      .action(async () => {
        await this.action.handle();
      });
  }
}

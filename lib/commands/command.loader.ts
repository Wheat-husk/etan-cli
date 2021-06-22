import { CommanderStatic } from 'commander';
import { StartAction } from '../actions';
import { StartCommand } from './start.command';

export class CommandLoader {
  public static load(program: CommanderStatic) {
    const startAction = new StartAction();
    new StartCommand(startAction).load(program);
    this.invalidCommand(program);
  }
  private static invalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      console.error(`\nERROR Invalid command: `, program.args.join(' '));
      console.log(`See --help for a list of available commands.\n`);
      process.exit(1);
    });
  }
}

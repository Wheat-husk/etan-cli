import { CommanderStatic } from 'commander';
import { StartAction, InfoAction, BuildAction } from '../actions';
import { InfoCommand } from './info.command';
import { StartCommand } from './start.command';
import { BuildCommand } from './build.command';

export class CommandLoader {
  public static load(program: CommanderStatic) {
    const startAction = new StartAction();
    const infoAction = new InfoAction();
    const buildAction = new BuildAction();
    new StartCommand(startAction).load(program);
    new InfoCommand(infoAction).load(program);
    new BuildCommand(buildAction).load(program);
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

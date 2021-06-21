import { Command, CommanderStatic } from 'commander';
import { StartAction } from '../actions';
import { StartCommand } from './start.command';

export class CommandLoader {
  public static load(program: CommanderStatic) {
    const startAction = new StartAction();
    new StartCommand(startAction).load(program);
  }
}

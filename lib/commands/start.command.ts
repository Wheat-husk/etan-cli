import { Command, CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Options } from './constant';
//https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md
export class StartCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('start')
      .option('-c, --config [path]', 'Path to etan-cli config file.')
      .option('-w, --watch', 'Run in watch electron main progress reload.')
      .option(
        '-d, --debug [hostport] ',
        'Run in debug mode (with --inspect flag).',
      )
      .option(
        '--preserveWatchOutput',
        'Use "preserveWatchOutput" option when tsc watch mode.',
      )
      .description('Run electron application.')
      .action(async (command: Command) => {
        const commandOptions = command.opts();

        const options: Options = {
          config: commandOptions.config,
          watch: commandOptions.watch,
          debug: commandOptions.debug,
          preserveWatchOutput: commandOptions.preserveWatchOutput,
        };

        await this.action.handle(options);
      });
  }
}

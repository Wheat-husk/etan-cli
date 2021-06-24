import { CommanderStatic } from 'commander';
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
      .action(async (command) => {
        const options: Options = {
          config: command.config,
          watch: command.watch,
          debug: command.debug,
          preserveWatchOutput: command.preserveWatchOutput,
        };

        await this.action.handle(options);
      });
  }
}

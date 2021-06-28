import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
//https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md
export class BuildCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('build')
      .option(
        '-c, --config [path]',
        'Path to etan-cli.json(default) configuration file.',
      )
      .option('-s, --skip', 'Skip typescript compilation, build electron.')

      .option(
        '-m, --mac [targetList...]',
        'Build for macOS, accepts target list (see https://goo.gl/5uHuzj)',
      )
      .option(
        '-l, --linux [targetList...]',
        'Build for Linux, accepts target list (see https://goo.gl/4vwQad)',
      )
      .option(
        '-w, --windows [targetList...]',
        'Build for Windows, accepts target list (see https://goo.gl/jYsTEJ)',
      )
      .option('--x64', 'Build for x64')
      .option('--ia32', 'Build for ia32')
      .option('--armv7l', 'Build for armv7l')
      .option('--arm64', 'Build for arm64')
      .option('--dir', 'Build unpacked dir. Useful to test.')
      .option(
        '--pd, --prepackaged',
        'The path to prepackaged app (to pack in a distributable format)',
      )
      .option(
        '--projectDir, --project [path]',
        'The path to project directory. Defaults to current',
      )
      // .option(
      //   '-c, --config [path]',
      //   "Defaults to 'electron-builder.yml' (or 'json', or 'json5'), see https://goo.gl/YFRJOM",
      // )
      .option(
        '--publish [options...]',
        'Publish artifacts (to GitHub Releases), see https://goo.gl/tSFycD [choices: "onTag", "onTagOrDraft", "always",  "never", undefined]',
      )
      .description('Output electron-builder cli build command info')
      .action(async (command) => {
        await this.action.handle(command);
      });
  }
}

#!/usr/bin/env node
import * as commander from 'commander';
import { CommanderStatic } from 'commander';
import { CommandLoader } from './commands';

function bootstrap() {
  const program: CommanderStatic = commander;
  program
    .version(
      require('../package.json').version,
      '-v, --version',
      'Outputs Etan CLI version.',
    )
    .usage('<command> [options]')
    .helpOption(
      '-h, --help',
      'Lists available commands and their short descriptions.',
    );

  CommandLoader.load(program);

  program.parse(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

bootstrap();

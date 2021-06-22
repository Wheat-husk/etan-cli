#!/usr/bin/env node

import * as commander from 'commander';
import { CommanderStatic } from 'commander';
// const tsConfigFileName = 'test-cli.json';
// import { StartAction } from '../lib/actions/index';

import { CommandLoader } from '../lib/commands';

function bootstrap(){
  const program: CommanderStatic = commander;
  program
    .version(
      require('../package.json').version,
      '-v, --version',
      '(v) Outputs Etan CLI version.'
    )
    .usage('<command> [options]')
    .helpOption('-h ,--help','(h) Lists available commands and their short descriptions.');

  CommandLoader.load(program);

  program.parse(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
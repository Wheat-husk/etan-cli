import { TypeScriptBinaryLoader } from '../compiler/typescript-loader';
import { join } from 'path';
//http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options
import { ChildProcess, spawn } from 'child_process';
import { Build } from './build';
import { ConfigurationLoder, Configuration } from '../configuration';
import { CLI_ERRORS } from '../ui/error';

export interface optionsType {
  watch: boolean;
  debug: boolean;
  //https://www.tslang.cn/docs/handbook/compiler-options.html
  preserveWatchOutput: boolean;
  cliConfigFilePath?: string;
}
export class Start extends Build {
  public async run(options: optionsType) {
    const tsBinary = this.tsLoader.load();

    const { watch, debug, preserveWatchOutput, cliConfigFilePath } = options;
    const { entryFile, tsConfigPath } =
      this.configLoader.load(cliConfigFilePath);

    const tsConfigpath = tsBinary.findConfigFile(
      this.root,
      tsBinary.sys.fileExists,
      tsConfigPath,
    )!;
    if (!tsConfigpath) {
      throw new Error(CLI_ERRORS.MISSING_TYPESCRIPT(tsConfigPath));
    }
    const { options: tsOptions } = tsBinary.getParsedCommandLineOfConfigFile(
      tsConfigpath,
      undefined!,
      tsBinary.sys as unknown as any,
    )!;
    const onSuccess = this.hooks(
      join(tsOptions.outDir!, `${entryFile}.js`),
      debug,
    );

    await this.runComplier(tsConfigpath, onSuccess);
  }
  public hooks(outputFilePath: string, debug?: boolean | string) {
    return () => {
      this.spawnChildProcess(outputFilePath, debug);
    };
  }
  public spawnChildProcess(outputFilePath: string, debug?: boolean | string) {
    const processArgs = [String(outputFilePath)];

    //chrome://inspect/#devices
    //https://nodejs.org/en/docs/guides/debugging-getting-started/
    if (debug) {
      const inspectFlag =
        typeof debug === 'string' ? `--inspect=${debug}` : '--inspect';
      processArgs.unshift(inspectFlag);
    }

    return spawn('npx', ['electron', '.', '--serve'], {
      stdio: 'inherit',
      shell: true,
    });
  }
}

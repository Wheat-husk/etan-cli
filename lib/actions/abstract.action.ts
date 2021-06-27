import { Options } from '../commands';
import { ConfigurationLoder } from '../configuration';
import { JsonFileReader } from '../readFile';
import { ProcessKillLoader } from '../KillProcess';
import { Compiler, WatchComplier } from '../compiler';
import { TypeScriptBinaryLoader } from '../binary';
import { GlobalCliLoader } from '../cli/cli.loader';
import { ChildProcess } from 'child_process';
import { CompilerOptions } from 'typescript';
import { CLI_ERRORS } from '../ui/error';

export abstract class AbstractAction {
  readonly root = process.cwd();
  readonly killLoader = new ProcessKillLoader();
  readonly tsLoader = new TypeScriptBinaryLoader();
  readonly readFile = new JsonFileReader(this.root);
  readonly configLoader = new ConfigurationLoder(this.readFile);
  readonly compiler = new Compiler(this.tsLoader);
  readonly watchComplier = new WatchComplier(this.tsLoader);
  readonly globalCli = new GlobalCliLoader();

  protected abstract spawnChildProcess(debug?: boolean | string): ChildProcess;
  protected abstract spawnChildProcess(): ChildProcess;

  public async handle(options: Options) {
    const onSuccess = this.hooks(options);
    await this.runComplier(options, onSuccess);
  }

  protected async runComplier(options: Options, onSuccess?: () => void) {
    const tsBinary = this.tsLoader.load();

    const { watch, preserveWatchOutput, config, skip } = options;

    const { tsConfigPath } = await this.configLoader.load(config);

    const tsConfigRootPath = tsBinary.findConfigFile(
      this.root,
      tsBinary.sys.fileExists,
      tsConfigPath,
    );

    const optionsToExtend: CompilerOptions = {};

    if (!tsConfigRootPath) {
      throw new Error(CLI_ERRORS.MISSING_TYPESCRIPT(tsConfigPath));
    }

    if (watch) {
      if (preserveWatchOutput) {
        optionsToExtend.optionsToExtend = true;
      }
      this.watchComplier.run(tsConfigRootPath, optionsToExtend, onSuccess);
    } else {
      if (skip) {
        onSuccess && onSuccess();
      } else {
        this.compiler.run(tsConfigRootPath, optionsToExtend, onSuccess);
      }
    }
  }

  protected hooks(options: Options) {
    let electronProcess: any | ChildProcess | undefined;
    process.on(
      'exit',
      () => electronProcess && this.killLoader.kill(electronProcess.pid),
    );

    return () => {
      if (electronProcess) {
        electronProcess.removeAllListeners('exit');
        electronProcess.on('exit', () => {
          electronProcess = this.spawnChildProcessMiddle(options.debug);
        });
        this.killLoader.kill(electronProcess.pid);
      } else {
        electronProcess = this.spawnChildProcessMiddle(options.debug);
      }
    };
  }
  protected spawnChildProcessMiddle(debug: any) {
    const electronProcess = this.spawnChildProcess(debug);
    //child exit
    electronProcess.on('exit', () => {
      //node exit
      process.exit(0);
    });
    return electronProcess;
  }
}

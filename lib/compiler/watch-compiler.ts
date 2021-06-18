/*https://github.com/microsoft/TypeScript/blob/main/tests/cases/compiler/APISample_WatchWithDefaults.ts*/
import { TypeScriptBinaryLoader } from './typescript-loader';

export class WatchComplier {
  constructor(private readonly tsLoader: TypeScriptBinaryLoader) {}

  public run(tsConfigPath: string, onSuccess?: () => void) {
    const tsBin = this.tsLoader.load();

    const host = tsBin.createWatchCompilerHost(tsConfigPath, {}, tsBin.sys);

    const origCreateProgram = host.createProgram;

    host.createProgram = (rootNames, options, host, oldProgram) => {
      // 创建编译程序
      return origCreateProgram(rootNames, options, host, oldProgram);
    };
    const origPostProgramCreate = host.afterProgramCreate;

    host.afterProgramCreate = (program) => {
      console.log('** We finished making the program! **');
      origPostProgramCreate!(program);
      onSuccess && onSuccess();
    };

    // `createWatchProgram` creates an initial program, watches files, and updates the program over time.
    tsBin.createWatchProgram(host);
  }
}

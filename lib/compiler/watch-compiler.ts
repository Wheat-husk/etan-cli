/*https://github.com/microsoft/TypeScript/blob/main/tests/cases/compiler/APISample_WatchWithDefaults.ts*/
import { CompilerOptions } from 'typescript';
import { AbstraCompiler } from './abstract.compiler';

export class WatchComplier extends AbstraCompiler {
  public run(
    tsConfigPath: string,
    optionsToExtend: CompilerOptions = {},
    onSuccess?: () => void,
  ) {
    const tsBin = this.tsLoader.load();

    const host = tsBin.createWatchCompilerHost(
      tsConfigPath,
      optionsToExtend,
      tsBin.sys,
    );
    const origCreateProgram = host.createProgram;

    host.createProgram = (rootNames, options, host, oldProgram) => {
      // 创建编译程序
      // Create compiler
      return origCreateProgram(rootNames, options, host, oldProgram);
    };

    // If provided, callback to invoke after every new program creation
    // 每次创建新程序后调用回调
    const origPostProgramCreate = host.afterProgramCreate;

    host.afterProgramCreate = (program) => {
      console.log('** We finished making the program! **');
      origPostProgramCreate!(program);
      onSuccess && onSuccess();
    };
    // ' createWatchProgram '创建一个初始程序，监视文件，并随着时间的推移更新程序
    // `createWatchProgram` creates an initial program, watches files, and updates the program over time.
    tsBin.createWatchProgram(host);
  }
}

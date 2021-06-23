/*https://github.com/microsoft/TypeScript/blob/main/tests/cases/compiler/APISample_compile.ts*/
import { connected } from 'process';
import { CompilerOptions, Diagnostic, ParseConfigFileHost } from 'typescript';
import { AbstraCompiler } from './abstract.compiler';

export class Compiler extends AbstraCompiler {
  public run(
    tsConfigPath: string,
    optionsToExtend: CompilerOptions = {},
    onSuccess?: () => void,
  ) {
    const tsBin = this.tsLoader.load();
    // const {config} = tsBin.readConfigFile(tsConfigPath,tsBin.sys.readFile);
    const parsedCommandLine = tsBin.getParsedCommandLineOfConfigFile(
      tsConfigPath,
      optionsToExtend,
      {
        useCaseSensitiveFileNames: true,
        getCurrentDirectory: tsBin.sys.getCurrentDirectory,
        readDirectory: tsBin.sys.readDirectory,
        fileExists: tsBin.sys.fileExists,
        readFile: tsBin.sys.readFile,
        // 在解析配置文件时报告不可恢复的错误
        // Reports unrecoverable error when parsing config file
        onUnRecoverableConfigFileDiagnostic: () => void 0,
      },
    );
    // const host = tsBin.createCompilerHost(config);
    // host.create
    // console.log(host)
    // host.getParsedCommandLine(tsConfigPath);

    // const origPostProgramCreate = host.afterProgramCreate;

    // host.afterProgramCreate = (program) => {
    //   console.log('** We finished making the program! **');
    //   origPostProgramCreate!(program);
    //   onSuccess && onSuccess();
    // };
    if (parsedCommandLine) {
      // `createWatchProgram` creates an initial program, watches files, and updates the program over time.
      tsBin.createProgram(parsedCommandLine.fileNames, optionsToExtend);
    }
  }
}

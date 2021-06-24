/*https://github.com/microsoft/TypeScript/blob/main/tests/cases/compiler/APISample_compile.ts*/
import {
  CompilerOptions,
  FormatDiagnosticsHost,
  ParseConfigFileHost,
} from 'typescript';
import { AbstraCompiler } from './abstract.compiler';

export class Compiler extends AbstraCompiler {
  public run(
    tsConfigPath: string,
    optionsToExtend: CompilerOptions = {},
    onSuccess?: () => void,
  ) {
    const tsBin = this.tsLoader.load();
    //executeCommandLine
    //https://github.com/microsoft/TypeScript/blob/main/src/executeCommandLine/executeCommandLine.ts#L608

    //executeCommandLineWorker
    //https://github.com/microsoft/TypeScript/blob/main/src/executeCommandLine/executeCommandLine.ts#L420

    //parseConfigFileWithSystem
    //https://github.com/microsoft/TypeScript/blob/main/src/compiler/watch.ts#L92

    const ParseConfigFileHost: ParseConfigFileHost = tsBin.sys as any;
    ParseConfigFileHost.onUnRecoverableConfigFileDiagnostic = undefined!;
    const config = tsBin.getParsedCommandLineOfConfigFile(
      tsConfigPath,
      optionsToExtend,
      ParseConfigFileHost,
    );
    if (config) {
      const host = tsBin.createIncrementalCompilerHost(
        config.options,
        tsBin.sys,
      );

      const { fileNames, projectReferences, options } = config;
      //options.incremental || options.composite
      // tsBin.createIncrementalProgram({
      //   host,
      //   rootNames: config.fileNames,
      //   options: config.options,
      // });
      //createIncrementalProgram

      //
      const program = tsBin.createProgram({
        host,
        rootNames: fileNames,
        projectReferences,
        options,
      });

      const { diagnostics } = program.emit();

      const allDiagnostics = program.getConfigFileParsingDiagnostics().slice();
      const formatHost: FormatDiagnosticsHost = {
        getCurrentDirectory: () => tsBin.sys.getCurrentDirectory(),
        getNewLine: () => tsBin.sys.newLine,
        getCanonicalFileName: (path) => path,
      };
      allDiagnostics.push(...diagnostics);
      allDiagnostics.forEach((diagnostic) => {
        tsBin.sys.write(
          tsBin.formatDiagnosticsWithColorAndContext([diagnostic], formatHost) +
            formatHost.getNewLine(),
        );
      });
      if (allDiagnostics.length == 0) {
        onSuccess && onSuccess();
      } else {
        process.exit(0);
      }
    }
  }
}

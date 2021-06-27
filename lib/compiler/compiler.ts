/*https://github.com/microsoft/TypeScript/blob/main/tests/cases/compiler/APISample_compile.ts*/
import {
  BuilderProgram,
  CompilerOptions,
  Diagnostic,
  ExitStatus,
  FormatDiagnosticsHost,
  ParseConfigFileHost,
  Program,
  ProjectReference,
  System,
} from 'typescript';
import { AbstraCompiler } from './abstract.compiler';

type ReportDiagnostic = (diagnostic: readonly Diagnostic[]) => void;

export class Compiler extends AbstraCompiler {
  readonly binary = this.tsLoader.load();
  public run(
    tsConfigPath: string,
    optionsToExtend: CompilerOptions = {},
    onSuccess?: () => void,
  ) {
    const reportDiagnostic = this.createDiagnosticReporter(this.binary.sys);
    //executeCommandLine
    //https://github.com/microsoft/TypeScript/blob/main/src/executeCommandLine/executeCommandLine.ts#L608

    //executeCommandLineWorker
    //https://github.com/microsoft/TypeScript/blob/main/src/executeCommandLine/executeCommandLine.ts#L420

    //parseConfigFileWithSystem
    //https://github.com/microsoft/TypeScript/blob/main/src/compiler/watch.ts#L92

    const ParseConfigFileHost: ParseConfigFileHost = this.binary.sys as any;
    ParseConfigFileHost.onUnRecoverableConfigFileDiagnostic = undefined!;
    const config = this.binary.getParsedCommandLineOfConfigFile(
      tsConfigPath,
      optionsToExtend,
      ParseConfigFileHost,
    );
    if (config) {
      const { fileNames, projectReferences, options } = config;
      let exitStatus;
      if (options.incremental || options.composite) {
        exitStatus = this.incrementalCompiler(
          options,
          fileNames,
          projectReferences,
          reportDiagnostic,
        );
      } else {
        exitStatus = this.compiler(
          options,
          fileNames,
          projectReferences,
          reportDiagnostic,
        );
      }
      !exitStatus && onSuccess && onSuccess();
      process.exit(exitStatus);
    }
  }

  incrementalCompiler(
    options: CompilerOptions,
    rootNames: string[],
    projectReferences: readonly ProjectReference[] | undefined,
    reportDiagnostic: ReportDiagnostic,
  ) {
    const binary = this.binary;
    const host = binary.createIncrementalCompilerHost(options, binary.sys);
    const program = binary.createIncrementalProgram({
      host,
      rootNames,
      projectReferences,
      options,
    });
    return this.programEmit(program, reportDiagnostic);
  }
  compiler(
    options: CompilerOptions,
    rootNames: string[],
    projectReferences: readonly ProjectReference[] | undefined,
    reportDiagnostic: ReportDiagnostic,
  ) {
    const binary = this.binary;
    const host = binary.createIncrementalCompilerHost(options, binary.sys);
    const program = binary.createIncrementalProgram({
      host,
      rootNames,
      projectReferences,
      options,
    });
    return this.programEmit(program, reportDiagnostic);
  }

  //https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
  programEmit(
    program: Program | BuilderProgram,
    reportDiagnostic: ReportDiagnostic,
  ) {
    const allDiagnostics = this.binary
      .getPreEmitDiagnostics(program as Program)
      .slice();
    if (allDiagnostics.length > 0) {
      reportDiagnostic(allDiagnostics);
      return ExitStatus.DiagnosticsPresent_OutputsGenerated;
    } else {
      program.emit();
      return ExitStatus.Success;
    }
  }

  createDiagnosticReporter(system: System): ReportDiagnostic {
    const formatHost: FormatDiagnosticsHost = {
      getCurrentDirectory: () => system.getCurrentDirectory(),
      getNewLine: () => system.newLine,
      getCanonicalFileName: (path) => path,
    };
    return (diagnostics) => {
      system.write(
        this.binary.formatDiagnosticsWithColorAndContext(
          diagnostics,
          formatHost,
        ) + formatHost.getNewLine(),
      );
    };
  }
}

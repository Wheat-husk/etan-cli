import * as ts from 'typescript';
import {
  CompilerOptions,
  ParseConfigFileHost,
  ParsedCommandLine,
} from 'typescript';

export class TypeScriptBinaryLoader {
  private tsBinary?: typeof ts;
  private parsedCommandLine?: ParsedCommandLine;
  public load(): typeof ts {
    if (this.tsBinary) {
      return this.tsBinary;
    }

    try {
      const tsBinaryPath = require.resolve('typescript', {
        paths: this.getModulePaths(),
      });
      const tsBinary = require(tsBinaryPath);
      this.tsBinary = tsBinary;
      return tsBinary;
    } catch {
      throw new Error(
        'TypeScript could not be found! Please, install "typescript" package.',
      );
    }
  }

  public getModulePaths() {
    return [process.cwd(), ...module.paths.reverse()];
  }
  public getParsedCommandLine(
    tsConfigPath: string,
    optionsToExtend: CompilerOptions = {},
  ) {
    if (this.parsedCommandLine) {
      return this.parsedCommandLine;
    }
    const tsBinary = this.load();
    //executeCommandLine
    //https://github.com/microsoft/TypeScript/blob/main/src/executeCommandLine/executeCommandLine.ts#L608

    //executeCommandLineWorker
    //https://github.com/microsoft/TypeScript/blob/main/src/executeCommandLine/executeCommandLine.ts#L420

    //parseConfigFileWithSystem
    //https://github.com/microsoft/TypeScript/blob/main/src/compiler/watch.ts#L92

    const ParseConfigFileHost: ParseConfigFileHost = tsBinary.sys as any;
    ParseConfigFileHost.onUnRecoverableConfigFileDiagnostic = undefined!;
    return tsBinary.getParsedCommandLineOfConfigFile(
      tsConfigPath,
      optionsToExtend,
      ParseConfigFileHost,
    )!;
  }
}

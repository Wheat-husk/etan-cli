import { TypeScriptBinaryLoader } from '../binary';
import { CompilerOptions } from 'typescript';
import { createDiagnosticReporter } from '../ui/Diagnostic';

export abstract class AbstraCompiler {
  readonly binary = this.tsLoader.load();
  readonly reportDiagnostic = createDiagnosticReporter(this.binary);

  constructor(protected tsLoader: TypeScriptBinaryLoader) {}
  public abstract run(
    tsConfigPath: string,
    optionsToExtend: CompilerOptions,
    onSuccess?: () => void,
  ): void;
}

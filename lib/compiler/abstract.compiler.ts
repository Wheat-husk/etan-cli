import { TypeScriptBinaryLoader } from './typescript-loader';
import { CompilerOptions } from 'typescript';

export abstract class AbstraCompiler {
  constructor(protected tsLoader: TypeScriptBinaryLoader) {}
  public abstract run(
    tsConfigPath: string,
    optionsToExtend: CompilerOptions,
    onSuccess?: () => void,
  ): void;
}

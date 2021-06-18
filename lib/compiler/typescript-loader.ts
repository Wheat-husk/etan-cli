//nest-cli
import * as ts from 'typescript';

export class TypeScriptBinaryLoader {
  private tsBinary?: typeof ts;

  public load(): typeof ts {
    if (this.tsBinary) {
      return this.tsBinary;
    }

    try {
      const tsBinaryPath = require.resolve('typescript', {
        paths: this.getModulePaths(),
      });
      console.log(this.getModulePaths());
      // eslint-disable-next-line @typescript-eslint/no-var-requires
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
}

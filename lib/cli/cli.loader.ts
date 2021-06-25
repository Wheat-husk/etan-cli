import { AbstractCli } from './abstract.cli';
import { Node } from './node';
import { Npm } from './npm.cli';
import { Yarn } from './yarn.cli';

export class GlobalCliLoader {
  public load(name: string): AbstractCli {
    switch (name) {
      case 'node':
        return new Node();
      case 'yarn':
        return new Yarn();
      case 'npm':
        return new Npm();
      default:
        throw new Error(`${name} is not `);
    }
  }
}

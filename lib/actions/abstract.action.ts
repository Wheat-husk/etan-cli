import { ChildProcess } from 'child_process';
import { Options } from '../commands';

export abstract class AbstractAction {
  public abstract handle(options?: Options): Promise<void>;
}

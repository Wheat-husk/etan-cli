import { BuildAction } from '../actions';
import { BuildOptions } from '../commands';

export function etanBuildProgram(options: BuildOptions = {}) {
  const buildAction = new BuildAction();

  buildAction.handle(options);
}

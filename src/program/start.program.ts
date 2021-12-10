import { StartAction } from '../actions';
import { StartOptions } from '../commands';

export function etanStartProgram(options: StartOptions = {}) {
  const startAction = new StartAction();

  startAction.handle(options);
}

import { StartAction, InfoAction, BuildAction } from './actions';

export const startAction = new StartAction();
export const infoAction = new InfoAction();
export const buildAction = new BuildAction();

export default {
  startAction,
  infoAction,
  buildAction,
};

import * as os from 'os';
import { GlobalCliLoader } from '../cli/cli.loader';

export async function getEtanInfo() {
  const globalCli = new GlobalCliLoader();
  const nodeV = await globalCli.load('node').v();
  const yarnV = await globalCli.load('yarn').v();
  const npmV = await globalCli.load('yarn').v();
  const osV = `${os.platform()} ${os.release()}`;

  return {
    os: osV,
    node: nodeV,
    npm: npmV,
    yarn: yarnV,
    etan: require('../../package.json').version,
  };
}

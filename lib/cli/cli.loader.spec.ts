import { GlobalCliLoader } from './cli.loader';
import { Npm } from './npm.cli';
import { Yarn } from './yarn.cli';

describe('Global Cli Loader load', () => {
  const globalCli = new GlobalCliLoader();
  describe('npm', () => {
    let npm: Npm;
    it("Should return class Npm when with call globalCli.load('npm').", () => {
      npm = globalCli.load('npm');
      expect(npm).toBeInstanceOf(Npm);
    });

    it('call yarn v', async () => {
      const vsersion = await npm.v();
      expect(vsersion).toBeTruthy();
    });
  });
  describe('yarn cli', () => {
    let yarn: Yarn;
    it("Should return class Yarn when with call globalCli.load('yarn').", () => {
      yarn = globalCli.load('yarn');
      expect(yarn).toBeInstanceOf(Yarn);
    });

    it('call yarn v', async () => {
      const vsersion = await yarn.v();
      expect(vsersion).toBeTruthy();
    });
  });
});

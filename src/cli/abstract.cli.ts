import { spawn } from 'child_process';

export abstract class AbstractCli {
  constructor(protected readonly binary: string) {}
  protected run(args: string[]): Promise<string> {
    return new Promise((resolve) => {
      const child = spawn(this.binary, args, {
        cwd: process.cwd(),
        stdio: 'pipe',
        shell: true,
      });
      child.stdout!.on('data', (data) => {
        resolve(data.toString().replace(/\n$/, ''));
      });
      child.on('close', () => {
        resolve('null');
      });
    });
  }
  public async v(): Promise<string> {
    return await this.run(['-v']);
  }
}

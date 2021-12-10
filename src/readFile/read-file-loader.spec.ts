import { JsonFileReader } from './read-file-loader';

const root = process.cwd();
const reader = new JsonFileReader(root);

describe('Json File Reader', () => {
  it('Should use require when read json file', async () => {
    const content = await reader.read('test/default-cli.json');
    expect(content).toEqual({
      sourceRoot: 'src',
      entryFile: 'main',
      tsConfigPath: 'tsconfig.json',
      projects: {},
    });
  });

  it('Should return undefined when file dont exist', async () => {
    const content = await reader.read('xxxx.json');
    expect(content).toEqual(undefined);
  });
});

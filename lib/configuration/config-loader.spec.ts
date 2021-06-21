import { ConfigurationLoder } from './config-loader';
import { JsonFileReader } from '../readFile/read-file-loader';
import { Configuration } from './configuration';
import { defaultConfig } from './default';

const etanJson = {
  entryFile: 'entry',
  tsConfigPath: 'tsconfig.serve.json',
};
const etanCliJson = {
  entryFile: 'etanCli',
  tsConfigPath: 'tsconfig.etanCli.json',
};

describe('Etan Configuration Loader', () => {
  let reader: JsonFileReader;
  beforeAll(() => {
    const mock = jest.fn();
    mock.mockImplementation(() => ({
      read: jest.fn((configPath) => {
        if (configPath == 'etan-cli.json') {
          return Promise.resolve(etanCliJson);
        }
        if (configPath == 'etan.json') {
          return Promise.resolve(etanJson);
        }
        //The file doesn't exist
        return Promise.resolve(undefined);
      }),
    }));
    reader = mock();
  });

  it('Should call reader.read when load', async () => {
    const configLoader = new ConfigurationLoder(reader);
    const configuration: Configuration = await configLoader.load();
    expect(reader.read).toHaveBeenCalledWith('etan-cli.json');
    expect(configuration).toEqual({
      sourceRoot: 'src',
      entryFile: 'etanCli',
      tsConfigPath: 'tsconfig.etanCli.json',
      projects: {},
    });
  });

  it('Should call reader.read when load with filename', async () => {
    const configLoader = new ConfigurationLoder(reader);
    const configuration: Configuration = await configLoader.load('etan.json');
    expect(reader.read).toHaveBeenCalledWith('etan.json');
    expect(configuration).toEqual({
      sourceRoot: 'src',
      entryFile: 'entry',
      tsConfigPath: 'tsconfig.serve.json',
      projects: {},
    });
  });

  it('Should return default config when with xxxx.json file dont exist', async () => {
    const configLoader = new ConfigurationLoder(reader);
    const configuration: Configuration = await configLoader.load('xxxx.json');
    expect(reader.read).toHaveBeenCalledWith('xxxx.json');
    expect(configuration).toEqual(defaultConfig);
  });
});

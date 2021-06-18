export interface ProjectConfiguration extends Configuration {
  root?: string;
}

export interface Configuration {
  sourceRoot: string;
  entryFile: string;
  tsConfigPath: string;
  projects?: {
    [key: string]: ProjectConfiguration;
  };
}

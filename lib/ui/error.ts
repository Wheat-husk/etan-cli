export const CLI_ERRORS = {
  MISSING_TYPESCRIPT: (path: string) =>
    `Could not find TypeScript configuration file "${path}". Please, ensure that you are running this command in the appropriate directory`,
  CONFIG_FILE: (path: string) =>
    `--config [path],could not find cli config file ${path}`,
};

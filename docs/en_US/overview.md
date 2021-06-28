### Overview

The `Etan Cli` is a command-line interface tool that helps you initialize, develop, and maintain your electronic applications. It helps in a number of ways, including building projects, providing services in development mode, and building applications for production distribution.

#### Installation


```bash
$ npm install -D @etanjs/cli
```

#### Basic workflow

After installation, you can invoke CLI commands directly from the operating system command line via the `etan` executable.

Please enter the following commands to see the available `etan` commands:

```bash
$ etan --help
```

Use the following structure to get help with a single command. Replace any command such as` build `, `start`, etc. You can see `start` in the following example to get detailed help with this command:

```bash
$ etan start --help
```


#### Command overview

Run `etan <command> --help` to see the command-specific options

| Command    | Alias | Description                 
| ---------- | ----- | ----------------------------------------------------------------------------------------------------- 
| `start`    |       | Compile and run the `Electron` application
| `build`    |       | Package the Electron application 
| `info`     | `i`   | Display Etan project details.


#### CLI properties

There are two CLI configuration files.

1. ：`etan-cli.json` is the default configuration file, mainly used to compile TypeScript and start the Electron function.

2. `electron-builder.json (.yml or.json5)` is the default configuration file for [`electron-builder`](https://www.electron.build/), which is mainly used to package electron. Details see https://www.electron.build/configuration/configuration#configuration( it will be merged into `etan-cli.json` in the future, although it's not clear when that will happen.)

```
{
  "sourceRoot": "src",
  "entryFile": "main",
  "tsConfigPath": "tsconfig.json",
  "projects": {}
}

```
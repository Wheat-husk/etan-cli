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


```
{
  "sourceRoot": "src",
  "entryFile": "main",
  "tsConfigPath": "tsconfig.json",
  "projects": {}
}

```
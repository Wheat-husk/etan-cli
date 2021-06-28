### Overview

ETAN CLI是一个命令行界面工具，可以帮助您初始化、开发和维护您的电子应用程序。它以多种方式提供帮助，包括构建项目、在开发模式中提供服务，以及为生产分发构建应用程序。

#### Installation


```bash
$ npm install -D @etanjs/cli
```

#### Basic workflow

安装完成后，您可以通过`etan`可执行文件直接从操作系统的命令行调用CLI命令。

请输入以下命令查看可用的`etan`命令:

```bash
$ etan --help
```

使用以下结构获取有关单个命令的帮助。替换任何命令，如`build`， `start`等，你可以在下面的例子中看到`start`，以获得该命令的详细帮助:

```bash
$ etan start --help
```


#### Command overview

运行` etan <command> --help `查看命令特定的选项

| Command    | Alias | Description                 
| ---------- | ----- | ----------------------------------------------------------------------------------------------------- 
| `start`    |       | 编译并运行`electron`应用程序
| `build`    |       | 将`electron`应用程序编译为输出文件夹。
| `info`     | `i`   | 显示Cli相关信息。


#### CLI properties

Cli 配置文件有2个。

1. `etan-cli.json` 是默认配置文件，主要是用作编译typescript 和启动electron功能.

2. `electron-builder.json(.yml 或者 .json5)` 是`electron-builder`默认配置文件，主要是用来打包electron. 详情查看 https://www.electron.build/configuration/configuration#configuration(未来会合并到etan-cli.json中，虽然不知何时会到来.)

```
//etan-cli.json(default)
{
  "sourceRoot": "src",
  "entryFile": "main",
  "tsConfigPath": "tsconfig.json",
  "projects": {}
}

```
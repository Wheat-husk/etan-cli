### CLI command reference

#### etan start

编译并运行应用程序。

```bash
$ etan start [options]
```

##### Options

| Option                     | Description                                            
| ---------------------------| -------------------------------------------------------------------- 
| `--config [path]`          | ` etan-cli.json(默认) `配置文件的路径。<br/>Alias `-c`     
| `--skip`                   | 跳过typescript编译，直接启动electron <br/> Alias `-s`            
| `--watch`                  | 在watch模式下运行,编译完成后重新加载`electron`程序 <br/>Alias `-w`        
| `--debug [hostport]`       | 在调试模式下运行(带有——inspect标志)                                  
| `--preserveWatchOutput`    | 保留watch模式下过时的控制台输出。                             


#### etan build

打包electron应用程序


```bash
$ etan build <name> [options]
```


##### Options

| Option                  | Description                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `--config [path]`                 | `etan-cli.json(默认) `配置文件的路径 <br/>Alias `-c` 
| `--skip`                          | 跳过typescript编译，直接build electron <br/> Alias `-s`
| `--publish [options...]`          | 发布产品(GitHub发布), see https://goo.gl/tSFycD. <br/>Alias `-p` 
| `--mac [targetList...]`           | 为macOS构建，接受目标列表 (see https://goo.gl/5uHuzj). <br/>Alias `-m`  
| `--linux [targetList...]`         | 为linux构建，接受目标列表 (see https://goo.gl/4vwQad) . <br/>Alias `-l`  
| `--windows [targetList...]`       | 为windows构建，接受目标列表 (see https://goo.gl/jYsTEJ). <br/>Alias `-w` 
| `--x64`                           | Build for x64
| `--ia32 `                         | Build for ia32
| `--armv7l  `                      | Build for armv7l
| `--arm64`                         | Build for arm64
| `--dir `                          | Build unpacked dir. Useful to test.
| `--pd, --prepackaged`             | The path to prepackaged app (to pack in a distributable format). 
| `--projectDir, --project [path]`  | 项目目录的路径。默认为当前。



#### etan info

显示Etan Cli信息。

```bash
[System Information] 

OS Version     : win32 10.0.19042
NodeJS Version : v15.14.0
Npm Version    : 7.11.1
Yarn Version   : 1.21.1

[Etan CLI]

Etan CLI Version : 1.0.0
```

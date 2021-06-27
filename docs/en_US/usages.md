### CLI command reference

#### etan start

Compiles and runs an application.

```bash
$ etan start [options]
```

##### Options

| Option                     | Description                                            
| ---------------------------| -------------------------------------------------------------------- 
| `--config [path]`          | Path to `etan-cli` configuration file. <br/>Alias `-c`                 
| `--watch`                  | Run it in watch mode and reload the 'Electron' program after compilation <br/>Alias `-w`        
| `--debug [hostport]`       | Run in debug mode (with --inspect flag)                                     
| `--preserveWatchOutput`    | Keep the outdated console output in watch mode.                              


#### etan build

Package the Electron application 


```bash
$ etan build <name> [options]
```


##### Options

| Option                  | Description                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `--config [path]`                 | Defaults to 'electron-builder.yml' (or 'json', or 'json5'), see https://goo.gl/YFRJOM. <br/>Alias `-c` 
| `--publish [options...]`          | Publish artifacts (to GitHub Releases), see https://goo.gl/tSFycD. <br/>Alias `-p` 
| `--mac [targetList...]`           | Build for macOS, accepts target list (see https://goo.gl/5uHuzj). <br/>Alias `-m`  
| `--linux [targetList...]`         | Build for Linux, accepts target list (see https://goo.gl/4vwQad) . <br/>Alias `-l`  
| `--windows [targetList...]`       | Build for Windows, accepts target list (see https://goo.gl/jYsTEJ). <br/>Alias `-w` 
| `--x64`                           | Build for x64
| `--ia32 `                         | Build for ia32
| `--armv7l  `                      | Build for armv7l
| `--arm64`                         | Build for arm64
| `--dir `                          | Build unpacked dir. Useful to test.
| `--pd, --prepackaged`             | The path to prepackaged app (to pack in a distributable format). 
| `--projectDir, --project [path]`  | The path to project directory. Defaults to current. 



#### etan info

Display Etan project details.

```bash
[System Information] 

OS Version     : win32 10.0.19042
NodeJS Version : v15.14.0
Npm Version    : 7.11.1
Yarn Version   : 1.21.1

[Etan CLI]

Etan CLI Version : 1.0.0
```

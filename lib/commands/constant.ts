export interface Options {
  config?: string;
  skip?: boolean;
}

type CompressedList =
  | '7z'
  | 'zip'
  | 'tar.xz'
  | 'tar.lz'
  | 'tar.gz'
  | 'tar.bz2'
  | 'dir';

type MacTargetList = CompressedList | 'dmg' | 'mas' | 'mas-dev' | 'pkg';

type LinuxTargetList =
  | CompressedList
  | 'AppImage'
  | 'snap'
  | 'deb'
  | 'rpm'
  | 'freebsd'
  | 'pacman'
  | 'p5p'
  | 'apk';

type WindowTargetList =
  | CompressedList
  | 'nsis'
  | 'nsis-web'
  | 'portable'
  | 'appx'
  | 'msi'
  | 'squirrel';

type Publish = 'onTag' | 'onTagOrDraft' | 'always' | 'never';

export interface BuildOptions extends Options {
  mac?: MacTargetList[];
  linux?: LinuxTargetList[];
  windows?: WindowTargetList[];
  x64?: boolean;
  ia32?: boolean;
  armv7l?: boolean;
  arm64?: boolean;
  dir?: boolean;
  prepackaged?: boolean;
  publish?: Publish[];
  project?: string;
  projectDir?: string;
}

export interface StartOptions extends Options {
  watch: boolean;
  debug: boolean;
  //https://www.tslang.cn/docs/handbook/compiler-options.html
  preserveWatchOutput: boolean;
}

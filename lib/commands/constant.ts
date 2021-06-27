export interface Options {
  watch: boolean;
  debug: boolean;
  //https://www.tslang.cn/docs/handbook/compiler-options.html
  preserveWatchOutput: boolean;
  config?: string;
  skip?: boolean;
}

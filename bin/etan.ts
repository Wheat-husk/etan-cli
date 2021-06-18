const tsConfigFileName = 'test-cli.json';

import { Start } from '../lib/actions/index';

const bootstrap = () => {
  const start = new Start();
  const options = {
    watch: false,
    debug: false,
    preserveWatchOutput: false,
    config: tsConfigFileName,
  };
  
  start.run(options);
};

bootstrap();
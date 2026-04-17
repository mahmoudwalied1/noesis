import { app } from './app';
import { appConfig } from './config/app';
import { logger } from './lib/logger';

app.listen(appConfig.port, () => {
  logger.info({ port: appConfig.port, env: appConfig.env }, 'Noesis backend listening');
});

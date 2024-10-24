import 'dotenv/config';
import { ConfigProps } from './config.interface';
import { toBoolean } from 'src/utils/strings.utils';

export default (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  logger: {
    level: process.env.LOG_LEVEL || 'log',
    folder: process.env.LOG_FOLDER || './logs',
  },
  swagger: {
    enable: toBoolean(process.env.SWAGGER_ENABLE),
    path: process.env.SWAGGER_PATH || 'api-docs',
  },
  redis: {
    connectionName: process.env.REDIS_CONNECTION_NAME || 'nestjs-api',
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    dbNum: parseInt(process.env.REDIS_DB_NUM || '1'),
    cluster: toBoolean(process.env.REDIS_CLUSTER),
  },
  rabbitmq: {
    host: process.env.RABBITMQ_HOST || 'amqp://localhost:5672',
  },
  db: {
    uri: process.env.DB_MONGO_URI,
    debug: toBoolean(process.env.DB_LOG_DEBUG),
  },
});

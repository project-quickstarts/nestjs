export interface LoggerConfigProps {
  folder: string;
  level: string;
}

export interface SwaggerConfigProps {
  enable: boolean;
  path: string;
}

export interface RedisConfigProps {
  connectionName: string;
  host: string;
  port: number;
  username: string;
  password: string;
  dbNum: number;
  cluster: boolean;
}

export interface RapidApiConfigProps {
  host: string;
}

export interface MongoDbConfigProps {
  uri: string;
  debug: boolean;
}

export interface ConfigProps {
  port: number;
  logger: LoggerConfigProps;
  swagger: SwaggerConfigProps;
  redis: RedisConfigProps;
  rabbitmq: RapidApiConfigProps;
  db: MongoDbConfigProps;
}

import { Config, EnvType } from './config_model';

const config: Config = {
  dbConntection: [
    'node_hero',  // database name
    'postgres',   // user
    'dev',        // password
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  ],
  app: {
    port: 3000,
  },
  env: EnvType.DEV,
};

export default config;

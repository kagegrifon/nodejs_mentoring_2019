export interface Config {
  dbConntection: [
    string,   // databe name
    string,   // user
    string,   // password
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  ],
  app: {
    port: number;
  }
}
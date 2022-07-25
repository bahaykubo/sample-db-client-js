export const Config = {
  postgresURI: 'postgresql://user:userpass@localhost:5432/postgres',
  postgresClient: {
    user: 'user',
    host: 'localhost',
    database: 'postgres',
    password: 'userpass',
    port: 5432,
  },
  sequelize: {
    logging: false
  },
};

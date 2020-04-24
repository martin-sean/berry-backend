import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
pg.defaults.ssl = true;

const herokuConnection = {
  client: "pg",
  connection: process.env.DATABASE_URL + '?sslmode=require',
  pool: {
    min: 0,
    max: 20
  },
  migrations: {
    tableName: "knex_migrations",
    extension: 'ts',
  }
}

module.exports = herokuConnection;
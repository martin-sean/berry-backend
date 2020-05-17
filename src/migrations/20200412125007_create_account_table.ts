import * as Knex from "knex";

const tableName = 'account';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .string('email')
      .notNullable();
    table
      .string('username')
      .notNullable();
    table
      .timestamps(true, true);
  })
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
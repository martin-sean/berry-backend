import * as Knex from "knex";

const tableName = 'tag'

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .string('name', 24)
      .notNullable();
    table
      .timestamps(true, true);
  })
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
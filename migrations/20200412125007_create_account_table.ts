import * as Knex from "knex";

const tableName = 'account';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .boolean('moderator')
      .notNullable()
      .defaultTo(false);
    table
      .string('external_id', 128)
      .notNullable()
      .index();
    table
      .string('username')
    table
      .timestamps(true, true);
    table
      .unique(['external_id']);
    table
      .unique(['username']);
  })
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
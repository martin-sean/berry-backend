import * as Knex from "knex";

const tableName = 'comment';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('clip_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clip')
      .index();
    table
      .integer('account_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('account')
      .index();
    table
      .string('content', 255)
      .notNullable();
    table
      .timestamps(true, true);
  });
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
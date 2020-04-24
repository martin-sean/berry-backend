import * as Knex from "knex";

const tableName = 'side';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .string('chapter_id', 12)
      .notNullable()
      .references('id')
      .inTable('chapter')
      .index();
    table
      .string('name', 12)
      .index();
    table
      .integer('side_no')
      .notNullable()
      .unsigned()
      .index();
    table
      .boolean('official')
      .notNullable()
      .index();
    table
      .timestamps(true, true);
  });
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
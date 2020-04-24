import * as Knex from "knex";

const tableName = 'chapter';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .string('id', 12)
      .notNullable()
      .index()
      .primary();
    table
      .integer('chapter_no')
      .unsigned()
      .index()
    table
      .string('name', 24)
      .notNullable()
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


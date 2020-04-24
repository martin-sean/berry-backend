import * as Knex from "knex";

const tableName = 'checkpoint';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('side_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('side')
      .index();
    table
      .string('name', 24)
      .index();
    table
      .string('abbreviation', 5)
      .index();
    table
      .integer('checkpoint_no')
      .index()
    table
      .timestamps(true, true);
  });
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
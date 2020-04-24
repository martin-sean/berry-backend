import * as Knex from "knex";

const tableName = 'room';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .string('debug_id', 24)
      .notNullable()
      .index();
    table
      .integer('room_no')
      .unsigned()
      .notNullable()
      .index();
    table
      .integer('checkpoint_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('checkpoint')
      .index();
    table
      .string('nickname', 24)
      .index();
    table
      .timestamps(true, true);
  });
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
import * as Knex from "knex";

const tableName = 'clip';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('account_id')
      .unsigned()
      .references('id')
      .inTable('account')
      .onDelete('SET NULL')
      .index();
    table
      .string('chapter_id', 12)
      .notNullable()
      .index()
    table
      .integer('side_no')
      .unsigned()
      .index()
    table
      .integer('checkpoint_no')
      .unsigned()
      .index()
    table
      .integer('room_no')
      .unsigned()
      .index()
    table
      .index(['chapter_id', 'side_no', 'checkpoint_no', 'room_no']);
    table
      .string('video_id', 11)
      .notNullable()
    table
      .integer('start')
      .unsigned()
      .notNullable();
    table
      .integer('end')
      .unsigned()
      .notNullable();
    table
      .string('name', 24);
    table
      .string('description', 255);
    table
      .timestamps(true, true);
  });
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
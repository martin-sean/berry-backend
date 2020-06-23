import * as Knex from "knex";

const tableName = 'nickname_suggestion';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('account_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('account')
      .onDelete('CASCADE')
      .index();
    table
      .integer('room_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('room')
      .onDelete('CASCADE')
      .index();
    table
      .string('nickname', 24)
      .notNullable();
  });
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
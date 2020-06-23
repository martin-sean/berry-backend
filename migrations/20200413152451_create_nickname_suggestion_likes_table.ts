import * as Knex from "knex";

const tableName = 'nickname_suggestion_likes';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('nickname_suggestion_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('nickname_suggestion')
      .onDelete('CASCADE')
      .index();
    table
      .integer('account_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('account')
      .onDelete('CASCADE')
      .index();
    table
      .timestamps(true, true);
  });
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
import * as Knex from "knex";

const tableName = 'clip_tags'

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
      .onDelete('CASCADE')
      .index();
    table
      .integer('tag_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tag')
      .onDelete('CASCADE')
      .index();
    table
      .timestamps(true, true);
  })
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}
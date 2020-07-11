import * as Knex from "knex";

const tableName = 'account_clip_likes';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.alterTable(tableName, (table) => {
    table.unique(['clip_id', 'account_id']);
  });
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropUnique(['clip_id', 'account_id']);
  });
}
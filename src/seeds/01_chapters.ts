import * as Knex from 'knex';

const tableName = 'chapter';

exports.seed = async (knex: Knex) => {
  // Wipe all entries
  await knex('room').del();
  await knex('checkpoint').del();
  await knex('side').del();
  await knex(tableName).del();
  // Inserts seed entries
  return knex(tableName).insert([
    { id: 'prologue', name: 'Prologue', official: true },
    { id: 'city', chapter_no: 1, name: 'Forsaken City', official: true },
    { id: 'site', chapter_no: 2, name: 'Old Site', official: true },
    { id: 'resort', chapter_no: 3, name: 'Celestial Resort', official: true },
    { id: 'ridge', chapter_no: 4, name: 'Golden Ridge', official: true },
    { id: 'temple', chapter_no: 5, name: 'Mirror Temple', official: true },
    { id: 'reflection', chapter_no: 6, name: 'Reflection', official: true },
    { id: 'summit', chapter_no: 7, name: 'The Summit', official: true },
    { id: 'epilogue', name: 'Epilogue', official: true },
    { id: 'core', chapter_no: 8, name: 'Core', official: true },
    { id: 'farewell', chapter_no: 9, name: 'Farewell', official: true },
  ]);
}
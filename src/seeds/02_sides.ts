import * as Knex from 'knex';

const tableName = 'side';

exports.seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex(tableName).del();
  // Inserts seed entries
  return knex(tableName).insert([
    // Prologue
    { id: '1', name: 'A', chapter_id: 'prologue', side_no: 1, official: true },

    // Chapter 1
    { id: 10, name: 'A', chapter_id: 'city', side_no: 1, official: true },
    { id: 11, name: 'B', chapter_id: 'city', side_no: 2, official: true },
    { id: 12, name: 'C', chapter_id: 'city', side_no: 3, official: true },

    // Chapter 2
    { id: 20, name: 'A', chapter_id: 'site', side_no: 1, official: true },
    { id: 21, name: 'B', chapter_id: 'site', side_no: 2, official: true },
    { id: 22, name: 'C', chapter_id: 'site', side_no: 3, official: true },

    // Chapter 3
    { id: 30, name: 'A', chapter_id: 'resort', side_no: 1, official: true },
    { id: 31, name: 'B', chapter_id: 'resort', side_no: 2, official: true },
    { id: 32, name: 'C', chapter_id: 'resort', side_no: 3, official: true },
    
    // Chapter 4
    { id: 40, name: 'A', chapter_id: 'ridge', side_no: 1, official: true },
    { id: 41, name: 'B', chapter_id: 'ridge', side_no: 2, official: true },
    { id: 42, name: 'C', chapter_id: 'ridge', side_no: 3, official: true },
    
    // Chapter 5
    { id: 50, name: 'A', chapter_id: 'temple', side_no: 1, official: true },
    { id: 51, name: 'B', chapter_id: 'temple', side_no: 2, official: true },
    { id: 52, name: 'C', chapter_id: 'temple', side_no: 3, official: true },
    
    // Chapter 6
    { id: 60, name: 'A', chapter_id: 'reflection', side_no: 1, official: true },
    { id: 61, name: 'B', chapter_id: 'reflection', side_no: 2, official: true },
    { id: 62, name: 'C', chapter_id: 'reflection', side_no: 3, official: true },
    
    // Chapter 7
    { id: 70, name: 'A', chapter_id: 'summit', side_no: 1, official: true },
    { id: 71, name: 'B', chapter_id: 'summit', side_no: 2, official: true },
    { id: 72, name: 'C', chapter_id: 'summit', side_no: 3, official: true },

    // Epilogue
    { id: 75, name: 'A', chapter_id: 'epilogue', side_no: 1, official: true },

    // Chapter 8
    { id: 80, name: 'A', chapter_id: 'core', side_no: 1, official: true },
    { id: 81, name: 'B', chapter_id: 'core', side_no: 2, official: true },
    { id: 82, name: 'C', chapter_id: 'core', side_no: 3, official: true },

    // Chapter 9
    { id: 90, name: 'A', chapter_id: 'farewell', side_no: 1, official: true },
  ]);
}
import * as Knex from 'knex';

const tableName = 'checkpoint';

exports.seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex(tableName).del();
  // Inserts seed entries
  return knex(tableName).insert([
    // Prologue
    { id: 50, side_id: 1, checkpoint_no: 1, name: 'Begin', abbreviation: 'BG' },

    // Chapter 1
    // A side
    { id: 100, side_id: 10, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 101, side_id: 10, checkpoint_no: 2, name: 'Crossing', abbreviation: 'CR' },
    { id: 102, side_id: 10, checkpoint_no: 3, name: 'Chasm', abbreviation: 'CH' },
    // B side
    { id: 103, side_id: 11, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 104, side_id: 11, checkpoint_no: 2, name: 'Contraption', abbreviation: 'CT' },
    { id: 105, side_id: 11, checkpoint_no: 3, name: 'Scrap Pit', abbreviation: 'SP' },
    // C side
    { id: 106, side_id: 12, checkpoint_no: 1, name: 'Begin', abbreviation: 'BG' },

    // Chapter 2
    // A side
    { id: 200, side_id: 20, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 201, side_id: 20, checkpoint_no: 2, name: 'Intervention', abbreviation: 'IV' },
    { id: 202, side_id: 20, checkpoint_no: 3, name: 'Awake', abbreviation: 'AW' },
    // B side
    { id: 203, side_id: 21, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 204, side_id: 21, checkpoint_no: 2, name: 'Combination Lock', abbreviation: 'CL' },
    { id: 205, side_id: 21, checkpoint_no: 3, name: 'Dream Altar', abbreviation: 'DA' },
    // C side
    { id: 206, side_id: 22, checkpoint_no: 1, name: 'Begin', abbreviation: 'BG' },

    // Chapter 3
    // A side
    { id: 300, side_id: 30, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 301, side_id: 30, checkpoint_no: 2, name: 'Huge Mess', abbreviation: 'HM' },
    { id: 302, side_id: 30, checkpoint_no: 3, name: 'Elevator Shaft', abbreviation: 'ES' },
    { id: 303, side_id: 30, checkpoint_no: 4, name: 'Presidential Suite', abbreviation: 'PS' },
    // B side
    { id: 304, side_id: 31, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 305, side_id: 31, checkpoint_no: 2, name: 'Staff Quarters', abbreviation: 'SQ' },
    { id: 306, side_id: 31, checkpoint_no: 3, name: 'Library', abbreviation: 'LB' },
    { id: 307, side_id: 31, checkpoint_no: 4, name: 'Rooftop', abbreviation: 'RT' },
    // C side
    { id: 308, side_id: 32, checkpoint_no: 1, name: 'Begin', abbreviation: 'BG' },

    // Chapter 4
    // A side
    { id: 400, side_id: 40, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 401, side_id: 40, checkpoint_no: 2, name: 'Shrine', abbreviation: 'SH' },
    { id: 402, side_id: 40, checkpoint_no: 3, name: 'Old Trail', abbreviation: 'OT' },
    { id: 403, side_id: 40, checkpoint_no: 4, name: 'Cliff Face', abbreviation: 'CF' },
    // B side
    { id: 404, side_id: 41, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 405, side_id: 41, checkpoint_no: 2, name: 'Stepping Stones', abbreviation: 'SS' },
    { id: 406, side_id: 41, checkpoint_no: 3, name: 'Gusty Canyon', abbreviation: 'GC' },
    { id: 407, side_id: 41, checkpoint_no: 4, name: 'Eye of the Storm', abbreviation: 'EOTS' },
    // C side
    { id: 408, side_id: 42, checkpoint_no: 1, name: 'Begin', abbreviation: 'BG' },

    // Chapter 5
    // A side
    { id: 500, side_id: 50, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 501, side_id: 50, checkpoint_no: 2, name: 'Depths', abbreviation: 'DP' },
    { id: 502, side_id: 50, checkpoint_no: 3, name: 'Unravelling', abbreviation: 'UR' },
    { id: 503, side_id: 50, checkpoint_no: 4, name: 'Search', abbreviation: 'SC' },
    { id: 504, side_id: 50, checkpoint_no: 5, name: 'Rescue', abbreviation: 'RS' },
    // B side
    { id: 505, side_id: 51, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 506, side_id: 51, checkpoint_no: 2, name: 'Central Chamber', abbreviation: 'CC' },
    { id: 507, side_id: 51, checkpoint_no: 3, name: 'Through the Mirror', abbreviation: 'TTM' },
    { id: 508, side_id: 51, checkpoint_no: 4, name: 'Mix Master', abbreviation: 'MM' },
    // C side
    { id: 509, side_id: 52, checkpoint_no: 1, name: 'Begin', abbreviation: 'BG' },

    // Chapter 6
    // A side
    { id: 600, side_id: 60, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 601, side_id: 60, checkpoint_no: 2, name: 'Lake', abbreviation: 'LK' },
    { id: 602, side_id: 60, checkpoint_no: 3, name: 'Hollows', abbreviation: 'HL' },
    { id: 603, side_id: 60, checkpoint_no: 4, name: 'Reflection', abbreviation: 'RF' },
    { id: 604, side_id: 60, checkpoint_no: 5, name: 'Rock Bottom', abbreviation: 'RB' },
    { id: 605, side_id: 60, checkpoint_no: 6, name: 'Resolution', abbreviation: 'RL' },
    // B side
    { id: 606, side_id: 61, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 607, side_id: 61, checkpoint_no: 2, name: 'Reflection', abbreviation: 'RF' },
    { id: 608, side_id: 61, checkpoint_no: 3, name: 'Rock Bottom', abbreviation: 'RB' },
    { id: 609, side_id: 61, checkpoint_no: 4, name: 'Reprieve', abbreviation: 'RP' },
    // C side
    { id: 610, side_id: 62, checkpoint_no: 1, name: 'Begin', abbreviation: 'BG' },

    // Chapter 7
    // A side
    { id: 700, side_id: 70, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 701, side_id: 70, checkpoint_no: 2, name: '500 M', abbreviation: '0.5K' },
    { id: 702, side_id: 70, checkpoint_no: 3, name: '1000 M', abbreviation: '1K' },
    { id: 703, side_id: 70, checkpoint_no: 4, name: '1500 M', abbreviation: '1.5K' },
    { id: 704, side_id: 70, checkpoint_no: 5, name: '2000 M', abbreviation: '2K' },
    { id: 705, side_id: 70, checkpoint_no: 6, name: '2500 M', abbreviation: '2.5K' },
    { id: 706, side_id: 70, checkpoint_no: 7, name: '3000 M', abbreviation: '3K' },
    // B side
    { id: 707, side_id: 71, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 708, side_id: 71, checkpoint_no: 2, name: '500 M', abbreviation: '0.5K' },
    { id: 709, side_id: 71, checkpoint_no: 3, name: '1000 M', abbreviation: '1K' },
    { id: 710, side_id: 71, checkpoint_no: 4, name: '1500 M', abbreviation: '1.5K' },
    { id: 711, side_id: 71, checkpoint_no: 5, name: '2000 M', abbreviation: '2K' },
    { id: 712, side_id: 71, checkpoint_no: 6, name: '2500 M', abbreviation: '2.5K' },
    { id: 713, side_id: 71, checkpoint_no: 7, name: '3000 M', abbreviation: '3K' },
    // C side
    { id: 714, side_id: 72, checkpoint_no: 1, name: 'Begin', abbreviation: 'BG' },

    // Epilogue
    { id: 750, side_id: 75, checkpoint_no: 1, name: 'Begin', abbreviation: 'BG' },

    // Chapter 8
    // A side
    { id: 800, side_id: 80, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 801, side_id: 80, checkpoint_no: 2, name: 'Into the Core', abbreviation: 'ITC' },
    { id: 802, side_id: 80, checkpoint_no: 3, name: 'Hot and Cold', abbreviation: 'HAC' },
    { id: 803, side_id: 80, checkpoint_no: 4, name: 'Heart of the Mountain', abbreviation: 'HOTM' },
    // B side
    { id: 804, side_id: 81, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 805, side_id: 81, checkpoint_no: 2, name: 'Into the Core', abbreviation: 'ITC' },
    { id: 806, side_id: 81, checkpoint_no: 3, name: 'Burning or Freezing', abbreviation: 'BOF' },
    { id: 807, side_id: 81, checkpoint_no: 4, name: 'Heartbeat', abbreviation: 'HB' },
    // C side
    { id: 808, side_id: 82, checkpoint_no: 1, name: 'Begin', abbreviation: 'BG' },

    // Chapter 9
    { id: 900, side_id: 90, checkpoint_no: 1, name: 'Start', abbreviation: 'ST' },
    { id: 901, side_id: 90, checkpoint_no: 2, name: 'Singular', abbreviation: 'SI' },
    { id: 902, side_id: 90, checkpoint_no: 3, name: 'Power Source', abbreviation: 'PS' },
    { id: 903, side_id: 90, checkpoint_no: 4, name: 'Remembered', abbreviation: 'RM' },
    { id: 904, side_id: 90, checkpoint_no: 5, name: 'Event Horizon', abbreviation: 'EH' },
    { id: 905, side_id: 90, checkpoint_no: 6, name: 'Determination', abbreviation: 'DT' },
    { id: 906, side_id: 90, checkpoint_no: 7, name: 'Stubbornness', abbreviation: 'SB' },
    { id: 907, side_id: 90, checkpoint_no: 8, name: 'Reconciliation', abbreviation: 'RC' },
    { id: 908, side_id: 90, checkpoint_no: 9, name: 'Farewell', abbreviation: 'FW' },
  ]);
}
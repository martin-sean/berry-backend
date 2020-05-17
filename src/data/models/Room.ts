import { Model } from 'objection';
import Checkpoint from './Checkpoint';

export default class Room extends Model {
  id!: number;
  debug_id!: string;
  room_no!: number;
  checkpoint_id!: number;
  nickname?: string;

  static tableName = 'room';
  static useLimitInFirst = true;
  
  static jsonSchema = {
    type: 'object',
    required: ['debug_id', 'room_no', 'checkpoint_id'],
    properties: {
      id: { type: 'integer' },
      debug_id: { type: 'string', minLength: 1, maxLength: 16 },
      room_no: { type: 'integer '},
      checkpoint_id: { type: 'integer' },
      nickname: { type: 'string', minLength: 1, maxLength: 24 },
    }
  }

  static relationMappings = () => ({
    // Checkpoint this room belongs to
    checkpoint: {
      relation: Model.BelongsToOneRelation,
      modelClass: Checkpoint,
      join: {
        from: 'room.checkpoint_id',
        to: 'checkpoint.id',
      },
    },
  });

}
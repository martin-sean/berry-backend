import { Model } from 'objection';
import Chapter from './Chapter';
import Checkpoint from './Checkpoint';

export default class Side extends Model {
  id!: number;
  chapter_id!: string;
  name!: string;
  side_no!: number;
  official!: boolean;

  static tableName = 'side';
  static useLimitInFirst = true;
  
  static jsonSchema = {
    type: 'object',
    required: ['chapter_id', 'side_no', 'official'],
    properties: {
      id: { type: 'integer' },
      chapter_id: { type: 'string', minLength: 1, maxLength: 12 },
      name: { type: 'string', minLength: 0, maxLength: 12 },
      side_no: { type: 'integer' },
      official: { type: 'boolean' },
    },
  }

  static relationMappings = () => ({
    // Chapter this side belongs to
    chapter: {
      relation: Model.BelongsToOneRelation,
      modelClass: Chapter,
      join: {
        from: 'side.chapter_id',
        to: 'chapter.id',
      },
    },
    // Checkpoints this side has
    checkpoints: {
      relation: Model.HasManyRelation,
      modelClass: Checkpoint,
      join: {
        from: 'side.id',
        to: 'checkpoint.side_id',
      },
    },
  });

}
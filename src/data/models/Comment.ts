import { Model } from 'objection';
import Account from './Account';
import Clip from './Clip';

export default class Comment extends Model {
  id!: number;
  account_id!: number;
  clip_id!: number;
  content!: string;

  static tableName = 'comment';

  static jsonSchema = {
    type: 'object',
    required: ['account_id', 'clip_id', 'content'],
    properties: {
      id: { type: 'integer' },
      account_id: { type: 'integer' },
      clip_id: { type: 'integer' },
      content: { type: 'string', minLength: 1, maxLength: 255 },
    },
  }

  static relationMappings = () => ({
    // Account that authored this comment
    account: {
      relation: Model.BelongsToOneRelation,
      modelClass: Account,
      join: {
        from: 'comment.account_id',
        to: 'account.id',
      },
    },
    // Clip this comment is on
    clip: {
      relation: Model.BelongsToOneRelation,
      modelClass: Clip,
      join: {
        from: 'comment.clip_id',
        to: 'clip.id',
      },
    },
  });

}
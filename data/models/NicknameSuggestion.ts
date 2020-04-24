import { Model } from 'objection';
import Account from './Account';

export default class NicknameSuggestion extends Model {
  id!: number;
  account_id!: number;
  room_id!: number;
  nickname!: string;

  static tableName = 'nickname_suggestion';

  static jsonSchema = {
    type: 'object',
    required: ['account_id', 'room_id', 'nickname'],
    properties: {
      id: { type: 'integer' },
      account_id: { type: 'integer' },
      clip_id: { type: 'integer' },
      nickname: { type: 'string', minLength: 1, maxLength: 24 },
    },
  }

  static relationMappings = () => ({
    // Account who made this suggestion
    accountAuthor: {
      relation: Model.BelongsToOneRelation,
      modelClass: Account,
      join: {
        from: 'nickname_suggestion.account_id',
        to: 'account.id',
      },
    },
    // Accounts that like this nickname suggestion
    likedBy: {
      relation: Model.ManyToManyRelation,
      modelClass: Account,
      join: {
        from: 'nickname_suggestion.id',
        through: {
          from: 'nickname_suggestion_likes.nickname_suggestion_id',
          to: 'nickname_suggestion_likes.account_id',
        },
        to: 'account.id',
      },
    },
  });

}
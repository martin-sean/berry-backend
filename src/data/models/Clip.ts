import { Model } from 'objection';
import Account from './Account';
import Tag from './Tag';
import Comment from './Comment';

export default class Clip extends Model {
  id!: number;
  chapter_id!: number;
  side_no!: number;
  checkpoint_no!: number;
  room_no!: number;
  video_id!: string;
  start_time!: number;
  end_time!: number;
  account_id?: number;
  name?: string;
  desc?: string;

  static tableName = 'clip';

  static jsonSchema = {
    type: 'object',
    required: ['chapter_id', 'side_no', 'checkpoint_no', 'room_no', 'video_id', 'start_time', 'end_time'],
    properties: {
      id: { type: 'integer' },
      chapter_id: { type: 'string', maxLength: 12 },
      side_no: { type: 'number' },
      checkpoint_no: { type: 'number' },
      room: { type: 'number' },
      video_id: { type: 'string', minLength: 11, maxLength: 11 },
      start_time: { type: 'number' },
      end_time: { type: 'number' },
      account_id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 64 },
      desc: { type: 'string', minLength: 1, maxLength: 256 },
    }
  }

  static relationMappings = () => ({
    // The Account that created the clip
    authorAccount: {
      relation: Model.BelongsToOneRelation,
      modelClass: Account,
      join: {
        from: 'account_id',
        to: 'account.id'
      },
    },
    // Accounts a clip is liked by
    likingAccounts: {
      relation: Model.ManyToManyRelation,
      modelClass: Account,
      join: {
        from: 'clip.id',
        through: {
          from: 'account_clip_likes.clip_id',
          to: 'account_clip_likes.account_id',
        },
        to: 'account.id',
      },
    },
    // Tags this clip has
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: Tag,
      join: {
        from: 'clip.id',
        through: {
          from: 'clip_tags.clip_id',
          to: 'clip_tags.tag_id',
        },
        to: 'tag.id',
      },
    },
    // Accounts who have commented on this clip
    commentingAccounts: {
      relation: Model.ManyToManyRelation,
      modelClass: Account,
      join: {
        from: 'clip.id',
        through: {
          from: 'comment.clip_id',
          to: 'comment.account_id',
        },
        to: 'account.id',
      },
    },
    // Comments on this clip
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: 'clip.id',
        to: 'comment.clip_id',
      },
    },
  });

}
import { Model } from 'objection';
import Clip from './Clip';

export default class Tag extends Model {
  id!: number;
  name!: string;

  static tableName = 'tag';

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 20 },
    }
  }

  static relationMappings = () => ({
    // Clips that have this tag
    clips: {
      relation: Model.ManyToManyRelation,
      modelClass: Clip,
      join: {
        from: 'tag.id',
        through: {
          from: 'clip_tags.tag_id',
          to: 'clip_tags.clip_id',
        },
        to: 'clip.id',
      }
    }
  });

}
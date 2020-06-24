import Clip from "../data/models/Clip";
import { Transaction, raw } from "objection";
import Tag from "../data/models/Tag";

/**
 * Delete orphan tags during a transaction before a clip is delete
 * @param clipId ID of the clip being deleted
 * @param tsx An objection/knex transaction
 */
export const deleteOrphanTags = async (clipId: number, tsx: Transaction) => {
  // Subquery to get tags for clip {id}
  const tags = Clip.relatedQuery('tags', tsx).for(clipId).select('tag.id');

  // Subquery to get clips tags with no other uses
  const tagsToDelete = Tag.query(tsx)
    .select('tag_id')
    .for(tags)
    .joinRelated('clips')
    .groupBy('tag_id')
    .having(raw('count(tag_id) = 1'))
    .whereIn('tag.id', tags);

  // Delete orphan tags
  await Clip.relatedQuery('tags', tsx)
    .for(clipId)
    .delete()
    .whereIn('tag.id', tagsToDelete);
}
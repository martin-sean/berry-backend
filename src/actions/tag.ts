import Clip from "../data/models/Clip";
import { Transaction, raw } from "objection";
import Tag from "../data/models/Tag";

/**
 * Create and relate an array of tags for a given clip
 * @param clip Clip new tags will belong to
 * @param tags Array of tags
 * @param trx Current transaction
 */
export const createAndRelateTags = async (clip: Clip, tags: string[], trx: Transaction) => {
    // Find tags that already exist
    const existingTags = await Tag.query(trx)
      .select('id', 'name')
      .whereIn('name', tags);

    // Get the array of related tag names
    const relatedTags = existingTags.map(tag => tag.name);
    // Determine tags that need to be created
    const newTags = tags.filter(tag => !relatedTags.includes(tag));
    const tagsToCreate = newTags.map(tag => ({ name: tag })) as any;

    // Relate the tags that already exist
    await clip.$relatedQuery('tags', trx).relate(existingTags);
    
    // Create and relate the tags that don't exist
    await clip.$relatedQuery('tags', trx).insert(tagsToCreate);
}

/**
 * Delete orphan tags during a transaction before a clip is delete
 * @param clipId ID of the clip being deleted
 * @param trx An objection/knex transaction
 */
export const deleteOrphanTags = async (clipId: number, trx: Transaction) => {
  // Subquery to get tags for clip {id}
  const tags = Clip.relatedQuery('tags', trx).for(clipId).select('tag.id');

  // Subquery to get clips tags with no other uses
  const tagsToDelete = Tag.query(trx)
    .select('tag_id')
    .for(tags)
    .joinRelated('clips')
    .groupBy('tag_id')
    .having(raw('count(tag_id) = 1'))
    .whereIn('tag.id', tags);

  // Delete orphan tags
  await Clip.relatedQuery('tags', trx)
    .for(clipId)
    .delete()
    .whereIn('tag.id', tagsToDelete);
}
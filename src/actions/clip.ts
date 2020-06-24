import Clip from "../data/models/Clip";
import Tag from "../data/models/Tag";
import { PartialModelObject, raw } from 'objection';
import { ClipData } from "../data/request/clip";
import { deleteOrphanTags } from "./tag";

/**
 * Create a new clip
 * @param data Clip data
 * @param userId ID of user creating the clip
 */
export const createClip = async (data: ClipData, userId: number) => {
  await Clip.transaction(async trx => {
    // Insert a new clip
    const clip = await Clip.query(trx).insert({
      account_id: userId,
      chapter_id: data.chapterId,
      side_no: data.sideNo,
      checkpoint_no: data.checkpointNo,
      room_no: data.roomNo,
      name: data.name || undefined,
      description: data.description || undefined,
      video_id: data.videoId,
      start_time: data.startTime,
      end_time: data.endTime
    });

    // TODO: Find a more efficient way to do this
    for (const tagName of data.tags) {
      // Get tag from database if it exists, return null if it doesn't
      const tag = await Tag.query(trx)
        .select('id')
        .findOne('name', tagName)
        .catch(error => null);
      // Check tag already exists  
      if (tag && clip) {
        // Relate the clip with an existing tag
        await clip.$relatedQuery('tags', trx).relate(tag);
      } else if (clip) {
        // Create new tag
        await clip.$relatedQuery('tags', trx).insert({ name: tagName } as PartialModelObject<Tag>);
      }
    }
  });
}

/**
 * Update an existing clip
 * @param data Clip data
 * @param userId ID of user creating the clip
 */
export const updateClip = async (data: ClipData, clipId: number, userId: number) => {
  
}

/**
 * Let a user delete their clip
 * @param clipId ID of clip to be deleted
 * @param userId ID of the user requesting the deletion
 */
export const deleteClipById = async (clipId: number, userId: number) => {
  await Clip.transaction(async (tsx) => {
    // Delete tags that will be made orphans by this clip deletion
    await deleteOrphanTags(clipId, tsx);
    // Delete the clip
    await Clip.query(tsx)
      .delete()
      .where('id', clipId)
      .where('account_id', userId)
      .limit(1);
  });
}

/**
 * Allow a moderator to delete any clip
 * @param clipId ID of the clip to be deleted
 */
export const modDeleteClipById = async (clipId: number) => {
  await Clip.transaction(async (tsx) => {
    // Delete tags that will be made orphans by this clip deletion
    await deleteOrphanTags(clipId, tsx);
    // Delete the clip
    await Clip.query(tsx).deleteById(clipId);
  });
}
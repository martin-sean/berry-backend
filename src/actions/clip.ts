import Clip from "../data/models/Clip";
import { Transaction } from 'objection';
import { NewClipData, UpdateClipData } from "../data/request/clip";
import { deleteOrphanTags, createAndRelateTags } from "./tag";

/**
 * Create a new clip
 * @param data Clip data
 * @param userId ID of user creating the clip
 */
export const createClip = async (data: NewClipData, userId: number) => {
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
    // Insert the tags
    data.tags && await createAndRelateTags(clip, data.tags, trx);
  });
}

/**
 * Update an existing clip
 * @param data Clip data
 * @param userId ID of user creating the clip
 */
export const updateClip = async (id: number, userId: number, data: UpdateClipData, updateTags: boolean) => {
  await Clip.transaction(async trx => {
    // Update the clip
    const clip = await Clip.query(trx).patchAndFetchById(id, {
      account_id: userId,
      name: data.name || undefined,
      description: data.description || undefined,
      video_id: data.videoId,
      start_time: data.startTime,
      end_time: data.endTime
    }).where('account_id', userId)
      .returning("*") as unknown as Clip;

    // Continue if tag update requested
    if (!updateTags) return;
    
    // Delete orphan tags
    await deleteOrphanTags(clip.id, trx);
    // Unrelate all other tags
    await clip.$relatedQuery('tags', trx).unrelate();
    // Add new tags
    data.tags && await createAndRelateTags(clip, data.tags, trx);
  });
}

/**
 * Let a user delete their clip
 * @param clipId ID of clip to be deleted
 * @param userId ID of the user requesting the deletion
 */
export const deleteClipById = async (clipId: number, userId: number, trx: Transaction) => {
  // Delete tags that will be made orphans by this clip deletion
  await deleteOrphanTags(clipId, trx);
  // Delete the clip
  await Clip.query(trx)
    .delete()
    .where('id', clipId)
    .where('account_id', userId)
    .limit(1);
}

/**
 * Allow a moderator to delete any clip
 * @param clipId ID of the clip to be deleted
 */
export const modDeleteClipById = async (clipId: number) => {
  await Clip.transaction(async (trx) => {
    // Delete tags that will be made orphans by this clip deletion
    await deleteOrphanTags(clipId, trx);
    // Delete the clip
    await Clip.query(trx).deleteById(clipId);
  });
}
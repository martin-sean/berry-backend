import express from 'express';
import isAuth from '../middleware/isAuth';
import Clip from '../data/models/Clip';
import { ClipData, clipDataValid } from '../data/request/clip';
import Tag from '../data/models/Tag';
import { PartialModelObject } from 'objection';

const router = express.Router();

/**
 * Get clips by room
 */
router.get('/', async (req, res) => {
  try {
    const chapterId = req.query.chapterId as string;
    const sideNo = parseInt(req.query.sideNo as string) || undefined;
    const checkpointNo = parseInt(req.query.checkpointNo as string) || undefined;
    const roomNo = parseInt(req.query.roomNo as string) || undefined;

    const clips = await Clip.query()
      .select(
        'clip.id',        
        'clip.name',
        'clip.description',
        'clip.video_id',
        'clip.start_time',
        'clip.end_time',
        'clip.created_at'
      )
      .skipUndefined()
      .where('clip.chapter_id', chapterId as any)
      .where('clip.side_no', sideNo as any)
      .where('clip.checkpoint_no', checkpointNo as any)
      .where('clip.room_no', roomNo as any)
      .withGraphJoined('tags(tagSelect)')
      .withGraphJoined('author(authorSelect)')
      .modifiers({
        tagSelect: builder => {
          builder.select('tag.name');
        },
        authorSelect: builder => {
          builder.select('account.username');
        }
      });
    return res.status(200).json(clips);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send();
  }
})

/**
 * Get a clip by id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const clip = await Clip.query()
      .select(
        'clip.chapter_id',
        'clip.side_no',
        'clip.checkpoint_no',
        'clip.room_no',
        'clip.video_id',
        'clip.start_time',
        'clip.end_time',
        'clip.name',
        'clip.description',
        'clip.created_at'
      )
      .findById(id)
      .withGraphJoined('tags(tagSelect)')
      .withGraphJoined('author(authorSelect)')
      .modifiers({
        tagSelect: builder => {
          builder.select('tag.name');
        },
        authorSelect: builder => {
          builder.select('account.username');
        }
      });
    return res.status(200).json(clip);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send();
  }
})

router.get('/tags', async (req, res) => {
  const tags = await Tag.query()
    .select('id', 'name');
  return res.status(200).json(tags);
})

// Create a new clip
router.post('/', isAuth, async (req, res) => {
  const userId: number = res.locals.userId;
  const data: ClipData = req.body;

  // Validate clip data
  if(!clipDataValid(data)) return res.status(400).send();

  try {
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

      // Handle tags
      for (const tagName of data.tags) {
        // Get tag from database if it exists, return null if it doesn't
        const tag = await Tag.query(trx)
          .select('id')
          .where('name', tagName)
          .first()
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
    // Transaction committed
    return res.status(200).send();
  } catch (error) {
    console.log(error.message);
    // Transaction is rolled back
    return res.status(400).send();
  }
});

// Delete a clip for a given id
router.delete('/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const userId: string = res.locals.userId;
  
  try {
    await Clip.transaction(async (tsx) => {
      // Get clip tags
      // const tags = await Clip.relatedQuery('tags', tsx)
      //   .for(id)
      //   .withGraphFetched('clips');

      // // Delete tags with no other
      // for (const tag of tags) {
      //   const clipCount = await tag.$relatedQuery('clips', tsx).resultSize();
      //   await tag.$relatedQuery('clips', tsx).unrelate();
      //   if (clipCount <= 1) await tag.$query(tsx).delete();
      // }

      // Delete the clip
      await Clip.query(tsx)
        .delete()
        .where('id', id)
        .where('account_id', userId)
        .limit(1);
    });
    // Success
    console.log('deleted');
    return res.status(200).send();
  } catch (error) {
    // Error deleting
    console.log(error.message);
    return res.status(400).send();
  }
});

export default router;
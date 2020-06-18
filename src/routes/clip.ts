import express from 'express';
import isAuth from '../middleware/isAuth';
import Clip from '../data/models/Clip';
import { ClipData, clipDataValid } from '../data/request/clip';
import Tag from '../data/models/Tag';
import { NotFoundError, UniqueViolationError, PartialModelObject } from 'objection';

const router = express.Router();

// Get all clips
router.get('/', async (req, res) => {
  const clips = await Clip.query()
    .select('id', 'chapter_id', 'video_id', 'start_time', 'name', 'description')
    .withGraphFetched('tags');
  return res.status(200).json(clips);
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
        name: data.name,
        description: data.description,
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
    // Transaction is rolled back
    return res.status(400).send();
  }
});

// Delete a clip for a given id
router.delete('/:id', isAuth, async (req, res) => {
  const { id } = req.params;
});

export default router;
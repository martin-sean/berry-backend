import express from 'express';
import isAuth from '../middleware/isAuth';
import Clip from '../data/models/Clip';
import { ClipData, clipDataValid } from '../data/request/clip';
import { deleteClipById, createClip, updateClip } from '../actions/clip';

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
  const { id } = req.params;

  try {
    if (isNaN(id as any)) throw Error("id must be a number");

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

// Create a new clip
router.post('/', isAuth, async (req, res) => {
  const userId: number = res.locals.userId;
  const data: ClipData = req.body;

  // Validate clip data
  if(!clipDataValid(data)) return res.status(400).send();

  try {
    createClip(data, userId);
    return res.status(200).send();
  } catch (error) {
    console.error(error.message);
    return res.status(400).send();
  }
});

/**
 * Allow editing of existing clips
 */
router.put('/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const userId: number = res.locals.userId;
  const data: ClipData = req.body;
  const updateTags = req.query.updateTags as string;

  try {
    if (isNaN(id as any)) throw Error("id must be a number");
    
    await updateClip(data, userId, updateTags === 'true');
    return res.status(200).send();
  } catch (error) {
    console.log(error.message);
    return res.status(400).send();
  }
});

// Delete a clip for a given id
router.delete('/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const userId: number = res.locals.userId;

  try {
    if (isNaN(id as any)) throw Error("Can't delete clip, id must be a number");
    await Clip.transaction(async (trx) => {
      await deleteClipById(parseInt(id), userId, trx);
    });
    return res.status(200).send();
  } catch (error) {
    console.error(error.message);
    return res.status(400).send();
  }
});

export default router;
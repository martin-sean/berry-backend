import express from 'express';
import Chapter from '../data/models/Chapter';
import Side from '../data/models/Side';
import Checkpoint from '../data/models/Checkpoint';

const router = express.Router();

// This controller is kind of deprecated. Data stored here is out of date compared to the
// current static chapter tree

// Get all chapters
router.get('/', async (req, res) => {
  res.json(await Chapter.query());
});

// Get checkpoints for a side number in a chapter
router.get('/:chapter_id/sides/:side_no/checkpoints', async (req, res) => {
  const sides = Chapter.relatedQuery('sides')
    .for(req.params.chapter_id)
    .findOne('side_no', req.params.side_no);
  
  res.json(await Side.relatedQuery('checkpoints').for(sides))  
});

// Get rooms for a checkpoint number in a side number in a chapter
router.get('/:chapter_id/sides/:side_no/checkpoints/:checkpoint_no/rooms', async (req, res) => {
  const sides = Chapter.relatedQuery('sides')
    .for(req.params.chapter_id)
    .findOne('side_no', req.params.side_no);
  
  const checkpoints = Side.relatedQuery('checkpoints')
    .for(req.params.side_no)
    .findOne('checkpoint_no', req.params.checkpoint_no)
    .for(sides);

    res.json(await Checkpoint.relatedQuery('rooms').for(checkpoints));
});

// Get rooms for a checkpoint number in a side number in a chapther
router.get('/:chapter_id/sides/:side_no/checkpoints/:checkpoint_no/rooms/:room_no', async (req, res) => {
  const sides = Chapter.relatedQuery('sides')
    .for(req.params.chapter_id)
    .findOne('side_no', req.params.side_no);
  
  const checkpoints = Side.relatedQuery('checkpoints')
    .for(req.params.side_no)
    .findOne('checkpoint_no', req.params.checkpoint_no)
    .for(sides);

    res.json(await Checkpoint.relatedQuery('rooms')
    .findOne('room_no', req.params.room_no)
    .for(checkpoints));
});

// Eager load entire chapter -> room tree
router.get('/tree', async (req, res) => {
  res.json(
    await Chapter.query()
    .select('id', 'chapter_no', 'name', 'official')
    .withGraphFetched(
      `sides(modifySides)
      .[checkpoints(modifyCheckpoints)
        .[rooms(modifyRoom)]
      ]`
    ).modifiers({
      modifySides(builder) {
        builder.select('side_no', 'name', 'official');
      },
      modifyCheckpoints(builder) {
        builder.select('checkpoint_no', 'name', 'abbreviation')
      },
      modifyRoom(builder) {
        builder.select('room_no', 'nickname as name', 'debug_id');
      }
    })
  );
});

export default router;

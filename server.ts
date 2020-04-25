import express, { Router } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import Knex from 'knex';
import * as KnexConfig from './knexfile';

import { Model } from 'objection';
import Chapter from './data/models/Chapter';
import Side from './data/models/Side';
import Checkpoint from './data/models/Checkpoint';
import Room from './data/models/Room';

const app = express();
const router = express.Router();
dotenv.config();

// Connect to DB
const knex = Knex(KnexConfig);
Model.knex(knex);

// Pretty JSON
app.set('json spaces', 2)

//
// Side bar menu endpoints
//

// Get all chapters
router.get('/chapters', async (req, res) => {
  res.json(await Chapter.query());
});

// Get the sides for a given chapter id
router.get('/chapters/:chapter_id/sides', async (req, res) => {
  res.json(await Chapter.relatedQuery('sides').for(req.params.chapter_id));
});

// Get checkpoints for a side number in a chapter
router.get('/chapters/:chapter_id/sides/:side_no/checkpoints', async (req, res) => {
  const sides = Chapter.relatedQuery('sides')
    .for(req.params.chapter_id)
    .where('side_no', req.params.side_no)
    .first();
  
  res.json(await Side.relatedQuery('checkpoints').for(sides))  
});

// Get rooms for a checkpoint number in a side number in a chapter
router.get('/chapters/:chapter_id/sides/:side_no/checkpoints/:checkpoint_no/rooms', async (req, res) => {
  const sides = Chapter.relatedQuery('sides')
    .for(req.params.chapter_id)
    .where('side_no', req.params.side_no)
    .first();
  
  const checkpoints = Side.relatedQuery('checkpoints')
    .for(req.params.side_no)
    .where('checkpoint_no', req.params.checkpoint_no)
    .first()
    .for(sides);

    res.json(await Checkpoint.relatedQuery('rooms').for(checkpoints));
});

//
// Room view
//

// Get rooms for a checkpoint number in a side number in a chapter
router.get('/chapters/:chapter_id/sides/:side_no/checkpoints/:checkpoint_no/rooms/:room_no', async (req, res) => {
  const sides = Chapter.relatedQuery('sides')
    .for(req.params.chapter_id)
    .where('side_no', req.params.side_no)
    .first();
  
  const checkpoints = Side.relatedQuery('checkpoints')
    .for(req.params.side_no)
    .where('checkpoint_no', req.params.checkpoint_no)
    .first()
    .for(sides);

    res.json(await Checkpoint.relatedQuery('rooms')
    .where('room_no', req.params.room_no)
    .first()
    .for(checkpoints));
});

//
// Following endpoints are currently not used
//

router.get('/chapters/:chapter_id', async (req, res) => {
  res.json(await Chapter.query().findById(req.params.chapter_id));
});


router.get('/sides/:side_id', async (req, res) => {
  res.json(await Side.query().findById(req.params.side_id));
});

router.get('/sides/:side_id/checkpoints', async (req, res) => {
  res.json(await Side.relatedQuery('checkpoints').for(req.params.side_id));
});

router.get('/checkpoints/:checkpoint_id', async (req, res) => {
  res.json(await Checkpoint.query().findById(req.params.checkpoint_id));
});

router.get('/checkpoints/:checkpoint_id/rooms', async (req, res) => {
  res.json(await Checkpoint.relatedQuery('rooms').for(req.params.checkpoint_id));
});

router.get('/rooms/:room_id', async (req, res) => {
  res.json(await Room.query().findById(req.params.room_id));
});

// Eager load entire chapter -> room tree
router.get('/chaptertree', async (req, res) => {
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
        builder.select('room_no', 'nickname as name', 'debug_id', 'image');
      }
    })
  );
});

// Use router prefix
app.use('/api', router);

const port = process.env.PORT || 5000;
app.listen(port);
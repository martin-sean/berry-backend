import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Knex from 'knex';
import * as KnexConfig from './knexfile';

import { Model } from 'objection';

import ChapterRouter from './routes/chapters';
import AuthenticateRouter from './routes/authenticate';

const app = express();
const router = express.Router();
dotenv.config();

// Connect to DB
const knex = Knex(KnexConfig);
Model.knex(knex);

// Pretty JSON
app.set('json spaces', 2)

// Allow req json parsing
app.use(bodyParser.json());

// Routes
router.use('/chapter', ChapterRouter);
router.use('/authenticate', AuthenticateRouter)

// Router version 1
app.use('/v1', router);

const port = process.env.PORT || 5000;
app.listen(port);
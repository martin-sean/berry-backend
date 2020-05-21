import express from 'express';
import dotenv from 'dotenv';
import Knex from 'knex';
import * as KnexConfig from '../knexfile';

import { Model } from 'objection';

import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import ChapterRouter from './routes/chapters';
import AuthenticateRouter from './routes/auth';
import cookieParser from 'cookie-parser';

const app = express();
const router = express.Router();
dotenv.config();

// Connect to DB
const knex = Knex(KnexConfig);
Model.knex(knex);

// Pretty JSON
app.set('json spaces', 2)

// Middlewares
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
router.use('/chapter', ChapterRouter);
router.use('/auth', AuthenticateRouter);

// Router version 1
app.use('/v1', router);

const port = process.env.PORT || 5000;

console.log(`Server started on port ${ port }`);
app.listen(port);
import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import logger from 'morgan';

import { port, mongoDBUri } from './config';
import { errorHandler } from './middlewares';
import { indexRouter, bookRouter } from './routers';
import { endPoint } from './constants';

const app = express();

mongoose.connect(mongoDBUri);
mongoose.connection.on('connected', () => {
  console.log(`Successfully connected to MongoDB: ${mongoDBUri}`);
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get(endPoint.index, indexRouter);
app.use(endPoint.book, bookRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

export { app };

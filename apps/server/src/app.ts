import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import userRouter from './routes/user.route';
import hotelRouter from './routes/hotel.route';
import authRouter from './routes/auth.route';
import helmet from 'helmet';

// @ts-ignore
// import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';

import { errorHandler } from './controllers/error.controller';

const app = express();

// app.enable('trust proxy');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.options(/.*/, cors());

app.use(express.static(`${__dirname}/public`));

app.use(helmet());

// Logging in development
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  limit: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request!!. Try again in an hour',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());
// app.use(xss());

app.use(compression());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/hotels', hotelRouter);

app.use(errorHandler);

export default app;

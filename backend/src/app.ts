import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import * as middlewares from './middlewares';
import passport from 'passport';
import commentRouter from './routes/commentsRoute';
import googleRouter from './routes/googleRoute';
import localRouter from './routes/localAuthRoute';
import productRouter from './routes/productRoute';
import paymentRouter from './routes/paymentRoute';
import './services/googleAuth';
import './services/jwtAuth';
import './services/localAuth';

const app = express();
app.use(passport.initialize());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/comments', commentRouter);
app.use('/api/auth', googleRouter);
app.use('/api/auth', localRouter);
app.use('/products', productRouter);
app.use('/payment', paymentRouter);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

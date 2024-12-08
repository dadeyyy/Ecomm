import express from 'express';
import { addProductComment, getProductComments, testComment } from '../controllers/commentController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const commentRouter = express.Router();

commentRouter.get('/product/:id', authenticateJWT, getProductComments);
commentRouter.post('/:productId', authenticateJWT, addProductComment);
commentRouter.get('/test', testComment);
export default commentRouter;
